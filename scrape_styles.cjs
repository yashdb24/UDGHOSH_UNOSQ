const puppeteer = require('puppeteer');

async function scrapeTata() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  console.log("=== TATABUILDINGINDIA.COM ===");
  try {
    await page.goto('https://www.tatabuildingindia.com', { waitUntil: 'networkidle2', timeout: 30000 });
    const data = await page.evaluate(() => {
      // Find SVGs that look like torn edges or background dividers
      const svgs = Array.from(document.querySelectorAll('svg')).map(svg => {
        return {
          id: svg.id || svg.className.baseVal,
          html: svg.outerHTML.substring(0, 300) // just get start
        };
      });
      
      // Find elements with classes related to birds, clouds, paper, torn
      const classesToFind = ['bird', 'cloud', 'torn', 'paper', 'edge', 'divider', 'wave', 'shape'];
      const elements = [];
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        if (el.className && typeof el.className === 'string') {
          for (const c of classesToFind) {
            if (el.className.toLowerCase().includes(c)) {
              const style = window.getComputedStyle(el);
              elements.push({
                tag: el.tagName,
                className: el.className,
                bgImage: style.backgroundImage,
                animation: style.animation,
                html: el.outerHTML.substring(0, 150)
              });
              break;
            }
          }
        }
      }
      return { svgs: svgs.slice(0, 10), elements: elements.slice(0, 15) };
    });
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {
    console.log("Error loading tata: " + e.message);
  }

  await browser.close();
}

scrapeTata();
