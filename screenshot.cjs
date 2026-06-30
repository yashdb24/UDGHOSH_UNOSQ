const puppeteer = require('puppeteer');
const path = require('path');

async function takeScreenshots() {
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 2000));
  
  const artifactDir = 'C:\\Users\\code\\.gemini\\antigravity\\brain\\ee55caad-2371-480f-a992-0a7124a34aab\\scratch';

  // Hero
  await page.screenshot({ path: path.join(artifactDir, 'hero_desktop.png') });
  
  // Scroll to Pools
  await page.evaluate(() => {
    document.querySelector('#pools').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'pools_desktop.png') });

  // Scroll to FinalCTA
  await page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'finalcta_desktop.png') });

  // Mobile
  await page.setViewport({ width: 390, height: 844 });
  
  // Scroll to top
  await page.evaluate(() => window.scrollTo(0,0));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'hero_mobile.png') });
  
  // Pools
  await page.evaluate(() => {
    document.querySelector('#pools').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'pools_mobile.png') });
  
  // FinalCTA
  await page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'finalcta_mobile.png') });

  await browser.close();
}

takeScreenshots();
