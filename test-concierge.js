const { chromium } = require('playwright');

async function testConciergeDrawer() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3007', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== TRACE: Concierge Drawer Accessibility ===');

    // Find and click Enquire button
    const enquireBtn = await page.$('button:has-text("Enquire")');
    if (!enquireBtn) {
      console.log('Enquire button not found!');
      return;
    }
    console.log('Found Enquire button, clicking...');
    await enquireBtn.click({ force: true });
    await page.waitForTimeout(1000);

    // Check initial focus in drawer
    let active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 60) } : null;
    });
    console.log('Initial focus in drawer:', active);

    // Check focusable elements in drawer
    const focusTrapState = await page.evaluate(() => {
      const drawer = document.querySelector('[role="dialog"]') || document.querySelector('.concierge-drawer') || document.querySelector('aside[aria-label]');
      if (!drawer) {
        // Try finding by the close button
        const closeBtn = document.querySelector('button:has-text("Close")');
        if (closeBtn) return { count: 1, elements: [{ text: 'Close button found' }] };
        return null;
      }
      const selectors = [
        "a[href]", "button:not([disabled])", "textarea:not([disabled])",
        "input:not([disabled])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])",
      ].join(", ");
      const focusable = Array.from(drawer.querySelectorAll(selectors))
        .filter((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
        });
      return {
        count: focusable.length,
        elements: focusable.map(el => ({ text: el.textContent?.trim().slice(0, 60), tag: el.tagName }))
      };
    });
    console.log('Drawer focus trap elements:', focusTrapState);

    // Test Tab navigation
    console.log('\n--- Tab Navigation in Drawer ---');
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 60) } : null;
      });
      console.log(`Tab ${i+1}:`, active);
    }

    // Test Shift+Tab navigation
    console.log('\n--- Shift+Tab Navigation in Drawer ---');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(150);
      active = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 60) } : null;
      });
      console.log(`Shift+Tab ${i+1}:`, active);
    }

    // Test Escape key closes drawer and restores focus
    console.log('\n--- Escape Key Closes Drawer ---');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(800);
    const enquireBtnAfter = await page.$('button:has-text("Enquire")');
    const focusRestored = await enquireBtnAfter?.evaluate(el => el === document.activeElement);
    console.log('Focus restored to Enquire button:', focusRestored);

    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 60) } : null;
    });
    console.log('Active element after Escape:', active);

    // Test reopening drawer
    console.log('\n--- Reopening Drawer ---');
    await enquireBtnAfter?.click({ force: true });
    await page.waitForTimeout(800);
    active = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 60) } : null;
    });
    console.log('Focus after reopening:', active);

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testConciergeDrawer().catch(console.error);