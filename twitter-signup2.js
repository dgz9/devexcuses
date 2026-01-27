const puppeteer = require('puppeteer-core');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function continueSignup() {
  console.log('Connecting to Chrome...');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null,
  });
  
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('x.com'));
  
  if (!page) {
    console.log('No x.com page found!');
    return;
  }
  
  console.log('Current URL:', page.url());
  
  try {
    // Fill name field
    console.log('Filling name...');
    const nameInput = await page.$('input[name="name"]');
    if (nameInput) {
      await nameInput.click({ clickCount: 3 }); // Select all
      await nameInput.type('Luke');
      console.log('Name entered: Luke');
    }
    
    await sleep(500);
    
    // Click "Use email instead"
    console.log('Looking for "Use email instead"...');
    const useEmailLink = await page.$('span:has-text("Use email instead")');
    if (!useEmailLink) {
      // Try by text content
      const spans = await page.$$('span');
      for (const span of spans) {
        const text = await page.evaluate(el => el.textContent, span);
        if (text && text.includes('Use email instead')) {
          await span.click();
          console.log('Clicked "Use email instead"');
          break;
        }
      }
    }
    
    await sleep(1000);
    
    // Now fill email
    console.log('Looking for email field...');
    const emailInput = await page.$('input[name="email"]');
    if (emailInput) {
      await emailInput.type('dgonzalez1992@outlook.com');
      console.log('Email entered');
    } else {
      // Try phone field first and then email
      const phoneInput = await page.$('input[name="phone"]');
      if (phoneInput) {
        // The phone input might have changed to email
        await phoneInput.type('dgonzalez1992@outlook.com');
        console.log('Typed email in input field');
      }
    }
    
    await sleep(500);
    
    // Fill date of birth - Jan 26, 2026 (my birthday!)
    console.log('Filling date of birth...');
    
    // Month dropdown
    const monthSelect = await page.$('select[name="month"], [data-testid="monthSelect"] select, select:nth-of-type(1)');
    if (monthSelect) {
      await monthSelect.select('1'); // January
      console.log('Selected month: January');
    } else {
      // Try clicking on Month dropdown
      const monthBtn = await page.$('[aria-label="Month"]');
      if (monthBtn) {
        await monthBtn.click();
        await sleep(300);
        const jan = await page.$('[role="option"]:has-text("January")');
        if (jan) await jan.click();
      }
    }
    
    await sleep(300);
    
    // Day dropdown
    const daySelect = await page.$('select[name="day"], [data-testid="daySelect"] select');
    if (daySelect) {
      await daySelect.select('26');
      console.log('Selected day: 26');
    }
    
    await sleep(300);
    
    // Year dropdown
    const yearSelect = await page.$('select[name="year"], [data-testid="yearSelect"] select');
    if (yearSelect) {
      await yearSelect.select('1995');
      console.log('Selected year: 1995');
    }
    
    await sleep(1000);
    await page.screenshot({ path: '/tmp/twitter-filled.png', fullPage: true });
    console.log('Screenshot saved');
    
    // Click Next button
    console.log('Looking for Next button...');
    const nextBtn = await page.$('button[type="button"]:has-text("Next"), div[role="button"]:has-text("Next")');
    if (nextBtn) {
      await nextBtn.click();
      console.log('Clicked Next');
    } else {
      // Find by text
      const buttons = await page.$$('div[role="button"]');
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes('Next')) {
          await btn.click();
          console.log('Clicked Next button');
          break;
        }
      }
    }
    
    await sleep(3000);
    await page.screenshot({ path: '/tmp/twitter-next.png', fullPage: true });
    console.log('Screenshot after Next saved');
    
  } catch (e) {
    console.log('Error:', e.message);
    await page.screenshot({ path: '/tmp/twitter-error.png', fullPage: true });
  }
  
  console.log('Done. Check VNC and screenshots.');
}

continueSignup().catch(console.error);
