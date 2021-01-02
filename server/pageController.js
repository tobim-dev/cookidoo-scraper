import pageScraper from "./pageScraper";
async function pageController(browserInstance, userData) {
  let browser;
  try {
    browser = await browserInstance;
    return await pageScraper.scraper(browser, userData);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

export default pageController;
