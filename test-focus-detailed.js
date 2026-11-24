const { chromium } = require('playwright');

async function testFocusDetailed() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== DETAILED TEST: Navigation Menu Tab Cycling ===');
    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Get initial focus
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Initial focus:', active);

    // Press Tab and wait for focus to actually change
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200); // Longer wait for focus to settle
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`Tab ${i+1}:`, active);
    }

    console.log('\n=== DETAILED TEST: Shift+Tab Cycling ===');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(200);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`Shift+Tab ${i+1}:`, active);
    }

    console.log('\n=== TEST: Escape closes menu and restores focus ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Focus after Escape:', active);
    const indexBtnAfter = await page.$('button:has-text("Index")');
    const focusRestored = await indexBtnAfter?.evaluate(el => el === document.activeElement);
    console.log('Focus restored to Index button:', focusRestored);

    console.log('\n=== TEST: Concierge Drawer ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const enquireBtn = await page.$('button:has-text("Enquire")');
    await enquireBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check which aside is open and its focusable elements
    const drawerInfo = await page.evaluate(() => {
      const asides = document.querySelectorAll('aside');
      for (const aside of asides) {
        const style = window.getComputedStyle(aside);
        if (style.transform === 'matrix(1, 0, 0, 1, 0, 0)' || style.transform.includes('translateX(0)')) {
          const focusableSelectors = [
            "a[href]", "button:not([disabled])", "textarea:not([disabled])",
            "input:not([disabled])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])",
          ].join(", ");
          const focusable = Array.from(aside.querySelectorAll(focusableSelectors));
          return {
            isOpen: true,
            focusableCount: focusable.length,
            focusable: focusable.map(el => ({
              tag: el.tagName,
              id: el.id,
              text: el.textContent?.trim().slice(0, 40),
              type: el.type,
            })),
          };
        }
      }
      return { isOpen: false };
    });
    console.log('Open drawer:', drawerInfo);

    // Check initial focus in drawer
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, id: el.id, text: el.textContent?.trim().slice(0, 40), type: el.type } : null;
    });
    console.log('Initial focus in drawer:', active);

    // Tab cycling in drawer
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, id: el.id, text: el.textContent?.trim().slice(0, 40), type: el.type } : null;
      });
      console.log(`Tab ${i+1}:`, active);
    }

    // Escape closes drawer
    console.log('\n--- Escape closes drawer ---');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
    const focusRestoredToEnquire = await enquireBtn.evaluate(el => el === document.activeElement);
    console.log('Focus restored to Enquire button:', focusRestoredToEnquire);

    console.log('\n=== TEST: Roving tabindex Arrow Keys ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check initial focus
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Initial focus:', active);

    // Arrow Down
    console.log('\n--- Arrow Down ---');
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(200);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
      });
      console.log(`ArrowDown ${i+1}:`, active);
    }

    // Arrow Up
    console.log('\n--- Arrow Up ---');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(200);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
      });
      console.log(`ArrowUp ${i+1}:`, active);
    }

    // Home
    console.log('\n--- Home ---');
    await page.keyboard.press('Home');
    await page.waitForTimeout(200);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Home:', active);

    // End
    console.log('\n--- End ---');
    await page.keyboard.press('End');
    await page.waitForTimeout(200);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('End:', active);

    // Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== TEST: Regression - No duplicate Escape handlers ===');
    // Open menu, press Escape once - should close, not double-close
    await indexBtn.click({ force: true });
    await page.waitForTimeout(800);

    const menuBefore = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      return menu ? window.getComputedStyle(menu).clipPath : null;
    });
    console.log('Menu before Escape:', menuBefore);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const menuAfter = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      return menu ? window.getComputedStyle(menu).clipPath : null;
    });
    console.log('Menu after single Escape:', menuAfter);

    // Verify menu is closed (clip-path should be inset(0% 0% 100% 0%) or similar)
    const isClosed = menuAfter && menuAfter.includes('100%');
    console.log('Menu properly closed after single Escape:', isClosed);

    console.log('\n=== ALL DETAILED TESTS COMPLETE ===');

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testFocusDetailed().catch(console.error);