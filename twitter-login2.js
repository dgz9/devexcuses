const puppeteer = require('puppeteer-core');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function login() {
  console.log('Connecting to Chrome...');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null,
  });
  
  // Close existing pages
  const existingPages = await browser.pages();
  for (const p of existingPages) {
    try { await p.close(); } catch (e) {}
  }
  
  const page = await browser.newPage();
  await page.goto('https://x.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
  
  console.log('Login page loaded');
  await sleep(3000);
  await page.screenshot({ path: '/tmp/twitter-login-start.png' });
  
  // Find and fill the username/email input
  console.log('Looking for username input...');
  const inputs = await page.$$('input');
  console.log(`Found ${inputs.length} inputs`);
  
  for (const input of inputs) {
    const type = await page.evaluate(el => el.type, input);
    const name = await page.evaluate(el => el.name, input);
    const autocomplete = await page.evaluate(el => el.autocomplete, input);
    console.log(`Input: type=${type}, name=${name}, autocomplete=${autocomplete}`);
  }
  
  // Type in the first text input
  const usernameInput = await page.$('input[type="text"], input[autocomplete="username"]');
  if (usernameInput) {
    await usernameInput.click();
    await sleep(200);
    await usernameInput.type('dgonzalez1992@outlook.com', { delay: 50 });
    console.log('Email entered');
  } else {
    console.log('Could not find username input');
    return;
  }
  
  await sleep(1000);
  await page.screenshot({ path: '/tmp/twitter-login-email.png' });
  
  // Click Next
  console.log('Clicking Next...');
  const nextClicked = await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Next') {
        btn.click();
        return true;
      }
    }
    return false;
  });
  console.log('Clicked Next:', nextClicked);
  
  await sleep(3000);
  await page.screenshot({ path: '/tmp/twitter-login-afterNext.png' });
  
  // Check if we need to enter username (sometimes Twitter asks for this)
  const content = await page.content();
  if (content.includes('Enter your phone number or username')) {
    console.log('Twitter asking for username verification...');
    const verifyInput = await page.$('input[data-testid="ocfEnterTextTextInput"]');
    if (verifyInput) {
      await verifyInput.type('dgonzalez1992@outlook.com', { delay: 50 });
      await sleep(500);
      await page.evaluate(() => {
        const btns = document.querySelectorAll('div[role="button"]');
        for (const btn of btns) {
          if (btn.textContent.includes('Next')) btn.click();
        }
      });
      await sleep(2000);
    }
  }
  
  // Enter password
  console.log('Looking for password field...');
  const passwordInput = await page.$('input[type="password"], input[name="password"]');
  if (passwordInput) {
    await passwordInput.click();
    await sleep(200);
    await passwordInput.type('eAv8aok%iB', { delay: 50 });
    console.log('Password entered');
  } else {
    console.log('No password field found');
    await page.screenshot({ path: '/tmp/twitter-login-nopass.png' });
    return;
  }
  
  await sleep(1000);
  await page.screenshot({ path: '/tmp/twitter-login-password.png' });
  
  // Click Log in
  console.log('Clicking Log in...');
  await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button');
    for (const btn of buttons) {
      const text = btn.textContent.trim();
      if (text === 'Log in') {
        btn.click();
        return;
      }
    }
  });
  
  await sleep(5000);
  await page.screenshot({ path: '/tmp/twitter-login-final.png' });
  
  console.log('Current URL:', page.url());
  
  if (page.url().includes('/home')) {
    console.log('🎉 SUCCESS! Logged in!');
  } else {
    console.log('May not be logged in yet...');
  }
  
  console.log('Done!');
}

login().catch(e => console.error('Error:', e.message));
