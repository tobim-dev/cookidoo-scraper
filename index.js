const express = require("express");
const browserObject = require("./browser");
const scraperController = require("./pageController");

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/recipesWeek", async (req, res) => {
  if (!req.body.username && !req.body.password) {
    return res
      .status(400)
      .send("Please provide your Cookidoo® username and password");
  }
  const userData = {
    username: req.body.username,
    password: req.body.password,
  };
  let browserInstance = browserObject.startBrowser();
  const result = await scraperController(browserInstance, userData);

  if (!result) {
    return res.send("Error scraping the Cookidoo website");
  }

  res.send(result);
});

app.listen(port, () => {
  console.log(`Cookidoo Scraper listening at http://localhost:${port}`);
});
