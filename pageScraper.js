const getRecipeInformation = require("./recipeScraper");

const scraperObject = {
  url: "https://cookidoo.de/foundation/de-DE",
  async scraper(browser, userData) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    // Landing Page
    await page.waitForSelector(
      "#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__links.unauthenticated-only > li:nth-child(2) > a"
    );
    await page.click(
      "#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__links.unauthenticated-only > li:nth-child(2) > a"
    );

    // Login Page
    await page.waitForSelector("#email");
    await page.$eval(
      "#email",
      (el, value) => (el.value = value),
      userData.username
    );
    await page.$eval(
      "#password",
      (el, value) => (el.value = value),
      userData.password
    );
    await page.click("#j_submit_id");

    await page.waitForNavigation();

    const error = await page.$("#j_login_form_id > div.errorMessage");

    if (error) {
      await browser.close();
      return null;
    }

    // Login Starter Page
    await page.waitForSelector(
      "#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__main-links > li:nth-child(3) > a"
    );
    await page.click(
      "#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__main-links > li:nth-child(3) > a"
    );

    // Week Page
    await page.waitForSelector(
      "#main > plan-timeline > section > plan-timeline-entry:nth-child(1) > article > core-tiles-list > core-tile > a"
    );

    const urls = await page.$$eval("core-tile > a", (links) => {
      links = links.map((el) => el.href);
      return links;
    });

    await browser.close();

    const getRecipeData = async () => {
      return Promise.all(urls.map((url) => getRecipeInformation(url)));
    };

    const recipeData = await getRecipeData();

    return recipeData;
  },
};

module.exports = scraperObject;
