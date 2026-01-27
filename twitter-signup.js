const puppeteer = require('puppeteer-core');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function signup() {
  console.log('Connecting to Chrome...');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null,
  });
  
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('x.com'));
  
  if (!page) {
    console.log('Opening x.com...');
    page = await browser.newPage();
    await page.goto('https://x.com', { waitUntil: 'networkidle2' });
  }
  
  console.log('Current URL:', page.url());
  
  // Wait for page to load
  await sleep(2000);
  
  // Click "Create account"
  console.log('Looking for Create account button...');
  try {
    await page.waitForSelector('a[href="/i/flow/signup"]', { timeout: 10000 });
    await page.click('a[href="/i/flow/signup"]');
    console.log('Clicked Create account');
    
    // Wait for signup modal
    await sleep(3000);
    
    // Take screenshot
    await page.screenshot({ path: '/tmp/twitter-signup.png', fullPage: true });
    console.log('Screenshot saved to /tmp/twitter-signup.png');
    
    // Check what's on screen
    const content = await page.content();
    if (content.includes('Something went wrong')) {
      console.log('Got "Something went wrong" error - Twitter bot detection');
      console.log('Will try to click Retry...');
      
      const retryBtn = await page.$('button');
      if (retryBtn) {
        const btnText = await page.evaluate(el => el.textContent, retryBtn);
        console.log('Found button:', btnText);
      }
    } else if (content.includes('Create your account') || content.includes('name')) {
      console.log('Signup form loaded!');
      
      // Try to find and fill the name field
      await sleep(1000);
      const nameInput = await page.$('input[name="name"]');
      if (nameInput) {
        await nameInput.type('Luke');
        console.log('Entered name: Luke');
        await sleep(500);
        
        // Look for email field
        const emailInput = await page.$('input[name="email"]');
        if (emailInput) {
          await emailInput.type('dgonzalez1992@outlook.com');
          console.log('Entered email');
        }
        
        await page.screenshot({ path: '/tmp/twitter-form.png', fullPage: true });
      }
    } else {
      console.log('Unknown page state');
    }
    
  } catch (e) {
    console.log('Error:', e.message);
    await page.screenshot({ path: '/tmp/twitter-error.png', fullPage: true });
  }
  
  console.log('Done. Check VNC to see current state.');
}

signup().catch(console.error);
