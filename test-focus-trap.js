const { chromium } = require('playwright');

async function testFocusTrap() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Track console errors
  page.on('console', msg => console.log('CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  try {
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to be ready and any animations to complete
    await page.waitForTimeout(2000);

    // Close any open modals/drawers first
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    console.log('\n=== TEST 1: Skip to main content link ===');
    const skipLink = await page.$('a.skip-link');
    console.log('Skip link exists:', !!skipLink);
    if (skipLink) {
      await skipLink.focus();
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute('href') : null;
      });
      console.log('Skip link receives focus:', focused === '#main-content');
    }

    console.log('\n=== TEST 2: Navigation Index button opens menu ===');
    const indexBtn = await page.$('button:has-text("Index")');
    console.log('Index button exists:', !!indexBtn);
    if (indexBtn) {
      await indexBtn.focus();
      await indexBtn.click({ force: true });
      await page.waitForTimeout(800);

      // Check menu is open
      const menu = await page.$('#architectural-menu');
      console.log('Architectural menu exists:', !!menu);
      if (menu) {
        const clipPath = await menu.evaluate(el => window.getComputedStyle(el).clipPath);
        console.log('Menu clip-path (open):', clipPath);

        // Check if menu is fully open (inset(0% 0% 0% 0%))
        const isOpen = clipPath.includes('0% 0% 0% 0%') || clipPath.includes('inset(0');
        console.log('Menu appears fully open:', isOpen);
      }

      // Test 2a: Focus trap - first element should be focused
      const firstNavItem = await page.$('#architectural-menu a[href]');
      console.log('First nav item in menu:', !!firstNavItem);
      if (firstNavItem) {
        const isFocused = await firstNavItem.evaluate(el => el === document.activeElement);
        console.log('First nav item receives focus on open:', isFocused);
      }

      // Test 2b: Tab cycles forward through nav items
      console.log('\n--- Tab cycling forward ---');
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
        const active = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
        });
        console.log(`Tab ${i+1}:`, active);
      }

      // Test 2c: Shift+Tab cycles backward
      console.log('\n--- Shift+Tab cycling backward ---');
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Shift+Tab');
        await page.waitForTimeout(100);
        const active = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { tag: el.tagName, text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
        });
        console.log(`Shift+Tab ${i+1}:`, active);
      }

      // Test 2d: Escape closes menu and restores focus to Index button
      console.log('\n--- Escape key closes menu ---');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(800);

      const menuAfterEscape = await page.$('#architectural-menu');
      if (menuAfterEscape) {
        const clipPath = await menuAfterEscape.evaluate(el => window.getComputedStyle(el).clipPath);
        console.log('Menu clip-path (after Escape):', clipPath);
      }

      const indexBtnAfter = await page.$('button:has-text("Index")');
      const focusRestored = await indexBtnAfter?.evaluate(el => el === document.activeElement);
      console.log('Focus restored to Index button:', focusRestored);
    }

    console.log('\n=== TEST 3: Concierge Drawer focus trap ===');
    // Make sure drawer is closed
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const enquireBtn = await page.$('button:has-text("Enquire")');
    console.log('Enquire button exists:', !!enquireBtn);
    if (enquireBtn) {
      await enquireBtn.focus();
      await enquireBtn.click({ force: true });
      await page.waitForTimeout(800);

      // Find the drawer - it's an aside element with translateX(0)
      const drawer = await page.evaluate(() => {
        const asides = document.querySelectorAll('aside');
        for (const aside of asides) {
          const style = window.getComputedStyle(aside);
          if (style.transform && style.transform.includes('translateX(0)')) {
            return aside;
          }
        }
        return null;
      });
      console.log('Drawer open:', !!drawer);

      if (drawer) {
        // Check first focusable element in drawer
        const firstFocusable = await page.evaluate(() => {
          const drawer = document.querySelector('aside[style*="translateX(0)"]');
          if (!drawer) return null;
          const focusable = drawer.querySelector('input, button, select, textarea, a[href]');
          return focusable;
        });
        console.log('First focusable in drawer:', !!firstFocusable);
        if (firstFocusable) {
          const isFocused = await page.evaluate(() => {
            const drawer = document.querySelector('aside[style*="translateX(0)"]');
            if (!drawer) return false;
            const focusable = drawer.querySelector('input, button, select, textarea, a[href]');
            return focusable === document.activeElement;
          });
          console.log('First focusable receives focus:', isFocused);
        }

        // Test Tab cycling in drawer
        console.log('\n--- Tab cycling in drawer ---');
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(100);
          const active = await page.evaluate(() => {
            const el = document.activeElement;
            return el ? { tag: el.tagName, type: el.type, text: el.textContent?.trim().slice(0, 40), id: el.id } : null;
          });
          console.log(`Tab ${i+1}:`, active);
        }

        // Test Escape closes drawer
        console.log('\n--- Escape closes drawer ---');
        await page.keyboard.press('Escape');
        await page.waitForTimeout(800);

        const focusRestoredToEnquire = await enquireBtn.evaluate(el => el === document.activeElement);
        console.log('Focus restored to Enquire button:', focusRestoredToEnquire);
      }
    }

    console.log('\n=== TEST 4: Roving tabindex with arrow keys ===');
    // Close any open elements first
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);

    const indexBtn2 = await page.$('button:has-text("Index")');
    if (indexBtn2) {
      await indexBtn2.click({ force: true });
      await page.waitForTimeout(800);

      // Wait for first item to be focused
      await page.waitForTimeout(200);

      console.log('\n--- Arrow Down navigation ---');
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);
        const active = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
        });
        console.log(`ArrowDown ${i+1}:`, active);
      }

      console.log('\n--- Arrow Up navigation ---');
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('ArrowUp');
        await page.waitForTimeout(100);
        const active = await page.evaluate(() => {
          const el = document.activeElement;
          return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
        });
        console.log(`ArrowUp ${i+1}:`, active);
      }

      console.log('\n--- Home key goes to first ---');
      await page.keyboard.press('Home');
      await page.waitForTimeout(100);
      const activeHome = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log('Home:', activeHome);

      console.log('\n--- End key goes to last ---');
      await page.keyboard.press('End');
      await page.waitForTimeout(100);
      const activeEnd = await page.evaluate(() => {
        const el = document.activeElement;
        return el ? { text: el.textContent?.trim().slice(0, 40), href: el.href } : null;
      });
      console.log('End:', activeEnd);

      // Test Enter key selects
      console.log('\n--- Enter key selects ---');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      const urlAfterEnter = page.url();
      console.log('URL after Enter:', urlAfterEnter);

      // Close menu
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }

    console.log('\n=== TEST 5: Focus-visible styles applied ===');
    const focusVisibleStyles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let rules = [];
      try {
        for (const sheet of styleSheets) {
          try {
            const cssRules = Array.from(sheet.cssRules || []);
            for (const rule of cssRules) {
              if (rule.selectorText && rule.selectorText.includes('focus-visible')) {
                rules.push(rule.cssText);
              }
            }
          } catch (e) {
            // Cross-origin stylesheet
          }
        }
      } catch (e) {
        // Ignore
      }
      return rules;
    });
    console.log('Focus-visible CSS rules found:', focusVisibleStyles.length);
    focusVisibleStyles.slice(0, 5).forEach(r => console.log('  -', r.slice(0, 120)));

    console.log('\n=== TEST 6: High contrast media query ===');
    const highContrastStyles = await page.evaluate(() => {
      // Check if CSS custom properties exist for high contrast
      const rootStyles = getComputedStyle(document.documentElement);
      return {
        ink: rootStyles.getPropertyValue('--color-ink').trim(),
        goldText: rootStyles.getPropertyValue('--color-gold-text').trim(),
        hairline: rootStyles.getPropertyValue('--color-hairline').trim(),
      };
    });
    console.log('CSS custom properties:', highContrastStyles);

    // Test prefers-contrast: more
    const highContrastMedia = await page.evaluate(() => {
      const mq = window.matchMedia('(prefers-contrast: more)');
      return mq.matches;
    });
    console.log('prefers-contrast: more matches (native):', highContrastMedia);

    // Test with forced prefers-contrast
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference', forcedColors: 'none' });

    // Check if the CSS has @media (prefers-contrast: more) rules
    const prefersContrastRules = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let rules = [];
      try {
        for (const sheet of styleSheets) {
          try {
            const cssRules = Array.from(sheet.cssRules || []);
            for (const rule of cssRules) {
              if (rule.type === 4 && rule.conditionText && rule.conditionText.includes('prefers-contrast')) { // CSSMediaRule
                for (const innerRule of rule.cssRules || []) {
                  rules.push(innerRule.cssText);
                }
              }
            }
          } catch (e) {
            // Cross-origin stylesheet
          }
        }
      } catch (e) {
        // Ignore
      }
      return rules;
    });
    console.log('CSS @media (prefers-contrast: more) rules found:', prefersContrastRules.length);
    prefersContrastRules.slice(0, 10).forEach(r => console.log('  -', r.slice(0, 120)));

    console.log('\n=== ALL TESTS COMPLETE ===');

  } catch (error) {
    console.error('TEST ERROR:', error);
  } finally {
    await browser.close();
  }
}

testFocusTrap().catch(console.error);