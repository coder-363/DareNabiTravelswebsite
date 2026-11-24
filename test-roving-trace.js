const { chromium } = require('playwright');

async function testRovingTrace() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== TRACE: Roving Tabindex Arrow Keys ===');
    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check initial focus
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
    });
    console.log('Initial focus:', active);

    // Check if keydown listener is on the container
    const listenerCheck = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return { menuExists: false };

      // Check the menu's event listeners indirectly
      // The hook adds listener to containerRef.current
      return {
        menuExists: true,
        clipPath: window.getComputedStyle(menu).clipPath,
        // Check if items are focusable
        items: Array.from(menu.querySelectorAll('a[href]')).map((el, i) => ({
          index: i,
          text: el.textContent?.trim().slice(0, 40),
          tabIndex: el.tabIndex,
        })),
      };
    });
    console.log('Menu state:', listenerCheck);

    // Test ArrowDown
    console.log('\n--- ArrowDown ---');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`ArrowDown ${i+1}:`, active);
    }

    // Test ArrowUp
    console.log('\n--- ArrowUp ---');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`ArrowUp ${i+1}:`, active);
    }

    // Test Home
    console.log('\n--- Home ---');
    await page.keyboard.press('Home');
    await page.waitForTimeout(150);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
    });
    console.log('Home:', active);

    // Test End
    console.log('\n--- End ---');
    await page.keyboard.press('End');
    await page.waitForTimeout(150);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
    });
    console.log('End:', active);

    // Test Enter
    console.log('\n--- Enter ---');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    const urlAfterEnter = page.url();
    console.log('URL after Enter:', urlAfterEnter);

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testRovingTrace().catch(console.error);