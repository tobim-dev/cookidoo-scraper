const express = require("express");
const browserObject = require("./browser");
const scraperController = require("./pageController");

const app = express();
const PORT = 8080;
const HOST = "0.0.0.0";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/recipesWeek", async (req, res) => {
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

app.listen(PORT, HOST, () => {
  console.log(`Cookidoo Scraper listening at http://${HOST}:${PORT}`);
});
