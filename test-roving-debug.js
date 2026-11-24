const { chromium } = require('playwright');

async function testRovingDebug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== DEBUG: Check Event Listeners ===');
    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check if keydown listener fires on the container
    const debugResult = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return { menuExists: false };

      // Check what elements have keydown listeners
      // We can't directly inspect listeners, but we can test by manually dispatching events
      const firstLink = menu.querySelector('a[href]');

      // Focus the first link
      firstLink.focus();

      // Check if the container has a keydown listener
      // We'll test by dispatching a keydown event on the container
      let containerReceived = false;
      let linkReceived = false;

      // Add a temporary listener to the container
      const containerHandler = (e) => {
        containerReceived = true;
        console.log('Container received keydown:', e.key, 'target:', e.target.tagName);
      };
      menu.addEventListener('keydown', containerHandler);

      // Dispatch ArrowDown on the container
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

      // Remove listener
      menu.removeEventListener('keydown', containerHandler);

      // Now test dispatching on the focused element
      let linkHandlerReceived = false;
      const linkHandler = (e) => {
        linkHandlerReceived = true;
        console.log('Link received keydown:', e.key);
      };
      firstLink.addEventListener('keydown', linkHandler);
      firstLink.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      firstLink.removeEventListener('keydown', linkHandler);

      return {
        menuExists: true,
        firstLinkText: firstLink.textContent?.trim().slice(0, 40),
        containerReceivedKeydown: containerReceived,
        linkReceivedKeydown: linkHandlerReceived,
        activeElement: document.activeElement?.tagName,
        activeElementText: document.activeElement?.textContent?.trim().slice(0, 40),
      };
    });
    console.log('Event test result:', debugResult);

    // Now test if arrow keys work when dispatched directly on the menu container
    console.log('\n--- Test ArrowDown on container directly ---');
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => {
        const menu = document.getElementById('architectural-menu');
        menu.focus(); // Focus the container itself
        menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      });
      await page.waitForTimeout(150);
      const active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
      });
      console.log(`Dispatch ArrowDown ${i+1}:`, active);
    }

    // Reset - click index again
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Test Tab to move focus, then arrow keys
    console.log('\n--- Tab once then ArrowDown ---');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(150);
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('After Tab:', active);

    // Now try ArrowDown on the focused element
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(150);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('After ArrowDown on focused element:', active);

    // Check if there are any errors in the roving tabindex hook
    const hookDebug = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      const items = menu.querySelectorAll('a[href]');
      return Array.from(items).map((el, i) => ({
        index: i,
        text: el.textContent?.trim().slice(0, 40),
        tabIndex: el.tabIndex,
      }));
    });
    console.log('\nNav items after Tab:', hookDebug);

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testRovingDebug().catch(console.error);