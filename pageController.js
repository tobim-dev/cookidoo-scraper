const pageScraper = require("./pageScraper");
async function scrapeAll(browserInstance, userData) {
  let browser;
  try {
    browser = await browserInstance;
    return await pageScraper.scraper(browser, userData);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = (browserInstance, userData) =>
  scrapeAll(browserInstance, userData);
