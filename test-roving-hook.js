const { chromium } = require('playwright');

async function testRovingHook() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3007', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    console.log('\n=== DEBUG: Hook State Reproduction ===');
    // Reproduce exactly what the hook does
    const hookState = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return null;

      // The hook uses itemsRef.current - let's see what it contains
      // The nav items are in the React ref, but we can check the DOM
      const items = menu.querySelectorAll('a[href]');

      // The hook filters like this:
      const filtered = Array.from(items).filter(
        (el) => el !== null && el.offsetParent !== null && window.getComputedStyle(el).display !== "none"
      );

      return {
        totalItems: items.length,
        filteredCount: filtered.length,
        filtered: filtered.map((el, i) => ({
          index: i,
          text: el.textContent?.trim().slice(0, 40),
          offsetParent: !!el.offsetParent,
          display: window.getComputedStyle(el).display,
        })),
      };
    });
    console.log('Hook filtered items:', hookState);

    // Now simulate the hook's keydown handler logic manually
    console.log('\n--- Simulate Hook ArrowDown Logic ---');
    let currentIndex = 0;
    for (let i = 0; i < 8; i++) {
      await page.evaluate((idx) => {
        const menu = document.getElementById('architectural-menu');
        const items = Array.from(menu.querySelectorAll('a[href]')).filter(
          (el) => el !== null && el.offsetParent !== null && window.getComputedStyle(el).display !== "none"
        );

        if (items.length === 0) return;

        // Simulate hook logic
        let nextIndex = idx;
        nextIndex = (idx + 1) % items.length;

        console.log(`Hook: currentIndex=${idx}, nextIndex=${nextIndex}, item=${items[nextIndex].textContent?.trim().slice(0, 40)}`);
        items[nextIndex]?.focus({ preventScroll: true });

        return nextIndex;
      }, currentIndex);

      await page.waitForTimeout(150);
      const active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
      });
      console.log(`  Actual focus after:`, active);

      // Update currentIndex for next iteration (simulate hook's ref)
      currentIndex = (currentIndex + 1) % (hookState?.filteredCount || 6);
    }

    // Check if focus() actually works
    console.log('\n--- Test focus() directly on elements ---');
    await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      const items = Array.from(menu.querySelectorAll('a[href]')).filter(
        (el) => el !== null && el.offsetParent !== null && window.getComputedStyle(el).display !== "none"
      );
      console.log('Item 0 (Home):', items[0].textContent?.trim().slice(0, 40));
      console.log('Item 1 (Umrah):', items[1].textContent?.trim().slice(0, 40));

      // Try focusing item 1
      items[1].focus({ preventScroll: true });
      console.log('After focusing item 1, activeElement:', document.activeElement?.textContent?.trim().slice(0, 40));
    });
    await page.waitForTimeout(150);
    const active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Actual active element:', active);

    // Check if items are actually focusable (tabIndex not -1)
    console.log('\n--- Check tabIndex and focusability ---');
    await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      const items = menu.querySelectorAll('a[href]');
      Array.from(items).forEach((el, i) => {
        console.log(`Item ${i}: tabIndex=${el.tabIndex}, href=${el.href}, focused=${el === document.activeElement}`);
      });
    });

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testRovingHook().catch(console.error);