const puppeteer = require('puppeteer-core');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function login() {
  console.log('Connecting to Chrome...');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null,
  });
  
  const page = await browser.newPage();
  await page.goto('https://x.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
  
  console.log('Login page loaded');
  await sleep(2000);
  
  // Enter email/username
  const usernameInput = await page.$('input[autocomplete="username"]');
  if (usernameInput) {
    await usernameInput.type('dgonzalez1992@outlook.com', { delay: 30 });
    console.log('Email entered');
  }
  
  await sleep(500);
  
  // Click Next
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Next') {
        btn.click();
        return;
      }
    }
  });
  console.log('Clicked Next');
  
  await sleep(3000);
  await page.screenshot({ path: '/tmp/twitter-login1.png' });
  
  // Enter password
  const passwordInput = await page.$('input[name="password"], input[type="password"]');
  if (passwordInput) {
    await passwordInput.type('eAv8aok%iB', { delay: 30 });
    console.log('Password entered');
  }
  
  await sleep(500);
  
  // Click Log in
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button');
    for (const btn of buttons) {
      const text = btn.textContent.trim();
      if (text === 'Log in' || text === 'Login') {
        btn.click();
        return;
      }
    }
  });
  console.log('Clicked Log in');
  
  await sleep(5000);
  await page.screenshot({ path: '/tmp/twitter-login2.png' });
  
  console.log('Current URL:', page.url());
  
  // Check if logged in
  if (page.url().includes('/home')) {
    console.log('SUCCESS! Logged in to Twitter!');
    
    // Get username
    await page.goto('https://x.com/settings/your_twitter_data/account', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await page.screenshot({ path: '/tmp/twitter-account.png' });
  }
  
  console.log('Done!');
}

login().catch(e => console.error('Error:', e.message));
