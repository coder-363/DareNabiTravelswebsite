const { chromium } = require('playwright');

async function testFocusDebug() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3004', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== DEBUG: Navigation Menu Focusable Elements ===');
    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check all focusable elements in the menu
    const focusableInMenu = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return [];
      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(", ");
      const elements = Array.from(menu.querySelectorAll(selectors));
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.textContent?.trim().slice(0, 40),
          href: el.href,
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          transform: style.transform,
          offsetParent: !!el.offsetParent,
          isVisible: style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null,
        };
      });
    });
    console.log('Focusable elements in menu:');
    focusableInMenu.forEach((el, i) => console.log(`  ${i}:`, el));

    console.log('\n=== DEBUG: Concierge Drawer ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const enquireBtn = await page.$('button:has-text("Enquire")');
    await enquireBtn.click({ force: true });
    await page.waitForTimeout(1000);

    const drawerDebug = await page.evaluate(() => {
      const asides = document.querySelectorAll('aside');
      const results = [];
      for (const aside of asides) {
        const style = window.getComputedStyle(aside);
        const focusableSelectors = [
          "a[href]",
          "button:not([disabled])",
          "textarea:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          "[tabindex]:not([tabindex='-1'])",
        ].join(", ");
        const focusable = Array.from(aside.querySelectorAll(focusableSelectors));
        results.push({
          transform: style.transform,
          opacity: style.opacity,
          pointerEvents: style.pointerEvents,
          focusableCount: focusable.length,
          focusable: focusable.map(el => ({
            tag: el.tagName,
            id: el.id,
            text: el.textContent?.trim().slice(0, 40),
            type: el.type,
          })),
        });
      }
      return results;
    });
    console.log('Aside elements:', drawerDebug);

    console.log('\n=== DEBUG: Roving Tabindex Items Ref ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    const rovingDebug = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return null;
      const links = menu.querySelectorAll('a[href]');
      return Array.from(links).map((el, i) => ({
        index: i,
        text: el.textContent?.trim().slice(0, 40),
        href: el.href,
        tabIndex: el.tabIndex,
        offsetParent: !!el.offsetParent,
        display: window.getComputedStyle(el).display,
        opacity: window.getComputedStyle(el).opacity,
      }));
    });
    console.log('Nav items for roving tabindex:', rovingDebug);

    console.log('\n=== DEBUG: Check focus trap event listeners ===');
    const listeners = await page.evaluate(() => {
      // Check if keydown listeners are attached
      const menu = document.getElementById('architectural-menu');
      return {
        menuExists: !!menu,
        menuStyle: menu ? window.getComputedStyle(menu).clipPath : null,
      };
    });
    console.log('Menu state:', listeners);

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testFocusDebug().catch(console.error);