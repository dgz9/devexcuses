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
    
    // Click "Use email instead" by evaluating page
    console.log('Looking for "Use email instead"...');
    const clicked = await page.evaluate(() => {
      const spans = document.querySelectorAll('span');
      for (const span of spans) {
        if (span.textContent && span.textContent.includes('Use email instead')) {
          span.click();
          return true;
        }
      }
      return false;
    });
    
    if (clicked) {
      console.log('Clicked "Use email instead"');
    } else {
      console.log('Could not find "Use email instead"');
    }
    
    await sleep(1000);
    await page.screenshot({ path: '/tmp/twitter-after-email-click.png', fullPage: true });
    
    // Now fill email
    console.log('Looking for email field...');
    let emailFilled = false;
    const emailInput = await page.$('input[name="email"]');
    if (emailInput) {
      await emailInput.type('dgonzalez1992@outlook.com');
      console.log('Email entered in email field');
      emailFilled = true;
    }
    
    if (!emailFilled) {
      // Look for any text input that might be for email
      const inputs = await page.$$('input[type="text"], input[type="email"], input:not([type])');
      for (const input of inputs) {
        const name = await page.evaluate(el => el.name || el.getAttribute('autocomplete') || '', input);
        const placeholder = await page.evaluate(el => el.placeholder || '', input);
        console.log(`Found input: name="${name}", placeholder="${placeholder}"`);
        
        if (name.includes('email') || placeholder.toLowerCase().includes('email')) {
          await input.type('dgonzalez1992@outlook.com');
          console.log('Email entered');
          emailFilled = true;
          break;
        }
      }
    }
    
    await sleep(500);
    
    // Fill date of birth using dropdowns
    console.log('Filling date of birth...');
    
    // Find all selects
    const selects = await page.$$('select');
    console.log(`Found ${selects.length} select elements`);
    
    for (let i = 0; i < selects.length; i++) {
      const options = await page.evaluate((sel, idx) => {
        const opts = Array.from(sel.options).map(o => o.value + ':' + o.text);
        return { idx, opts: opts.slice(0, 5) };
      }, selects[i], i);
      console.log(`Select ${i}:`, options.opts);
    }
    
    // Month (index 0), Day (index 1), Year (index 2)
    if (selects.length >= 3) {
      await selects[0].select('1'); // January (value might be "1" or "January")
      await sleep(200);
      await selects[1].select('26'); // Day 26
      await sleep(200);
      await selects[2].select('1995'); // Year 1995
      console.log('Date of birth filled: January 26, 1995');
    }
    
    await sleep(1000);
    await page.screenshot({ path: '/tmp/twitter-filled.png', fullPage: true });
    console.log('Screenshot saved');
    
    // Click Next button
    console.log('Looking for Next button...');
    const nextClicked = await page.evaluate(() => {
      const buttons = document.querySelectorAll('div[role="button"], button');
      for (const btn of buttons) {
        if (btn.textContent && btn.textContent.trim() === 'Next') {
          btn.click();
          return true;
        }
      }
      return false;
    });
    
    if (nextClicked) {
      console.log('Clicked Next');
    } else {
      console.log('Could not find Next button');
    }
    
    await sleep(3000);
    await page.screenshot({ path: '/tmp/twitter-next.png', fullPage: true });
    console.log('Screenshot after Next saved');
    
  } catch (e) {
    console.log('Error:', e.message);
    console.log(e.stack);
    await page.screenshot({ path: '/tmp/twitter-error.png', fullPage: true });
  }
  
  console.log('Done. Check VNC and screenshots.');
}

continueSignup().catch(console.error);
