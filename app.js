const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // Function to log HTML content to console
  const logHTMLContent = async (page) => {
    const htmlContent = await page.content();
    console.log(htmlContent);
  };

  // Listen for the 'targetcreated' event to detect new windows/pages
  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page();
      // Log the initial HTML content for the new page
      await logHTMLContent(newPage);

      // Listen for the 'domcontentloaded' event and log HTML content on each update
      newPage.on('domcontentloaded', () => logHTMLContent(newPage));

      // Perform other interactions if needed for the new page
    }
  });

  // Navigate to the desired URL
  await page.goto('https://www.example.com');

  // Perform other interactions if needed

  // Keep the script running
  await new Promise(() => {});
})();
