const puppeteer = require('puppeteer-core');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function waitForContent(page, text, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const content = await page.content();
    if (content.includes(text)) return true;
    await sleep(500);
  }
  return false;
}

async function signup() {
  console.log('Connecting to Chrome...');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://localhost:9223',
    defaultViewport: null,
  });
  
  // Close all existing pages and open fresh
  const pages = await browser.pages();
  for (const p of pages) {
    if (p.url().includes('x.com')) {
      await p.close();
    }
  }
  
  console.log('Opening x.com...');
  const page = await browser.newPage();
  await page.goto('https://x.com', { waitUntil: 'networkidle2', timeout: 30000 });
  
  console.log('Page loaded:', page.url());
  await sleep(2000);
  
  // Step 1: Click Create account
  console.log('Step 1: Click Create account...');
  await page.evaluate(() => {
    const link = document.querySelector('a[href="/i/flow/signup"]');
    if (link) link.click();
  });
  
  await sleep(3000);
  
  // Wait for the form to load
  if (await waitForContent(page, 'Create your account', 10000)) {
    console.log('Signup form loaded!');
  } else {
    console.log('Form did not load, taking screenshot...');
    await page.screenshot({ path: '/tmp/twitter-step1-error.png' });
    return;
  }
  
  await page.screenshot({ path: '/tmp/twitter-step1.png' });
  
  // Step 2: Fill name
  console.log('Step 2: Filling name...');
  const nameInput = await page.$('input[name="name"]');
  if (nameInput) {
    await nameInput.type('Luke', { delay: 50 });
    console.log('Name entered');
  }
  
  await sleep(500);
  
  // Step 3: Click "Use email instead"
  console.log('Step 3: Switching to email...');
  const emailClicked = await page.evaluate(() => {
    const spans = document.querySelectorAll('span');
    for (const span of spans) {
      if (span.textContent.includes('Use email instead')) {
        span.click();
        return true;
      }
    }
    return false;
  });
  console.log('Clicked Use email instead:', emailClicked);
  
  await sleep(1000);
  
  // Step 4: Fill email
  console.log('Step 4: Filling email...');
  const emailInput = await page.$('input[name="email"]');
  if (emailInput) {
    await emailInput.type('dgonzalez1992@outlook.com', { delay: 30 });
    console.log('Email entered');
  } else {
    console.log('Email input not found');
  }
  
  await sleep(500);
  await page.screenshot({ path: '/tmp/twitter-step4.png' });
  
  // Step 5: Fill date of birth
  console.log('Step 5: Filling DOB...');
  const selects = await page.$$('select');
  if (selects.length >= 3) {
    await selects[0].select('1'); // January
    await sleep(200);
    await selects[1].select('26'); // Day
    await sleep(200);
    await selects[2].select('1995'); // Year
    console.log('DOB filled: Jan 26, 1995');
  }
  
  await sleep(1000);
  await page.screenshot({ path: '/tmp/twitter-step5.png' });
  
  // Step 6: Click Next
  console.log('Step 6: Clicking Next...');
  const nextClicked = await page.evaluate(() => {
    const buttons = document.querySelectorAll('div[role="button"], button');
    for (const btn of buttons) {
      const text = btn.textContent.trim();
      if (text === 'Next') {
        btn.click();
        return true;
      }
    }
    return false;
  });
  console.log('Clicked Next:', nextClicked);
  
  await sleep(5000);
  await page.screenshot({ path: '/tmp/twitter-step6.png' });
  
  // Check what step we're on
  const content = await page.content();
  if (content.includes('verification') || content.includes('verify')) {
    console.log('==> VERIFICATION STEP - Need to check email');
  } else if (content.includes('password') || content.includes('Password')) {
    console.log('==> PASSWORD STEP');
  } else if (content.includes('Something went wrong')) {
    console.log('==> ERROR: Something went wrong');
  } else if (content.includes('Customize')) {
    console.log('==> CUSTOMIZE EXPERIENCE STEP');
  }
  
  console.log('Done! Check screenshots in /tmp/');
}

signup().catch(e => {
  console.error('Error:', e.message);
});
