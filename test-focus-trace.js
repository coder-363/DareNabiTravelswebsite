const { chromium } = require('playwright');

async function testFocusTrace() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3007', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== TRACE: Navigation Menu Tab Behavior ===');
    const indexBtn = await page.$('button:has-text("Index")');
    await indexBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check initial focus
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
    });
    console.log('Initial focus:', active);

    // Check what the focus trap sees
    const focusTrapState = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      if (!menu) return null;
      const selectors = [
        "a[href]", "button:not([disabled])", "textarea:not([disabled])",
        "input:not([disabled])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])",
      ].join(", ");
      const focusable = Array.from(menu.querySelectorAll(selectors))
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
        });
      return {
        count: focusable.length,
        elements: focusable.map(el => ({ text: el.textContent?.trim().slice(0, 40), href: el.href }))
      };
    });
    console.log('Focus trap elements:', focusTrapState);

    // Press Tab and check active element after each
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`Tab ${i+1}:`, active);
    }

    // Now check if there's a keydown listener on document
    const listenerCheck = await page.evaluate(() => {
      // We can't directly check listeners, but we can check if the hook is working
      const menu = document.getElementById('architectural-menu');
      const focusableSelectors = [
        "a[href]", "button:not([disabled])", "textarea:not([disabled])",
        "input:not([disabled])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])",
      ].join(", ");
      const focusable = Array.from(menu.querySelectorAll(focusableSelectors))
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
        });

      // Simulate what the focus trap does
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      return {
        firstElement: first?.textContent?.trim().slice(0, 40),
        lastElement: last?.textContent?.trim().slice(0, 40),
        activeElement: activeEl?.textContent?.trim().slice(0, 40),
        isActiveFirst: activeEl === first,
        isActiveLast: activeEl === last,
        focusableCount: focusable.length,
      };
    });
    console.log('\nFocus trap state after Tab presses:', listenerCheck);

    console.log('\n=== TRACE: Shift+Tab Behavior ===');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log(`Shift+Tab ${i+1}:`, active);
    }

    // Check focus trap state again
    const listenerCheck2 = await page.evaluate(() => {
      const menu = document.getElementById('architectural-menu');
      const focusableSelectors = [
        "a[href]", "button:not([disabled])", "textarea:not([disabled])",
        "input:not([disabled])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])",
      ].join(", ");
      const focusable = Array.from(menu.querySelectorAll(focusableSelectors))
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
        });

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      return {
        firstElement: first?.textContent?.trim().slice(0, 40),
        lastElement: last?.textContent?.trim().slice(0, 40),
        activeElement: activeEl?.textContent?.trim().slice(0, 40),
        isActiveFirst: activeEl === first,
        isActiveLast: activeEl === last,
        focusableCount: focusable.length,
      };
    });
    console.log('\nFocus trap state after Shift+Tab:', listenerCheck2);

    // Test Escape focus restoration
    console.log('\n=== TRACE: Escape Focus Restoration ===');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
    const indexBtnAfter = await page.$('button:has-text("Index")');
    const focusRestored = await indexBtnAfter?.evaluate(el => el === document.activeElement);
    console.log('Focus restored to Index button:', focusRestored);

    // Check what element has focus
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40) } : null;
    });
    console.log('Active element after Escape:', active);

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testFocusTrace().catch(console.error);