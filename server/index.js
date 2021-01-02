import express from "express";
import startBrowser from "./browser";
import scraperController from "./pageController";
import NodeCache from "node-cache";
import generateUserId from "./utils/generateUserId";
import recipeScraper from "./recipeScraper";

const app = express();
const myCache = new NodeCache();
const PORT = 8080;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  if (!req.body.recipeId) {
    return res.status(400).send("Please provide a Recipie ID");
  }
  const recipeId = req.body.recipeId;
  const recipeURL = `https://cookidoo.de/recipes/recipe/de-DE/${recipeId}`;

  const cachedResult = myCache.get(recipeId);

  let result;
  if (!cachedResult) {
    result = await recipeScraper(recipeURL);
  } else {
    result = cachedResult;
  }

  if (!result) return res.status(500).send("Error scraping the recipe");

  myCache.set(recipeId, result, 86400);

  res.send(result);
});

app.post("/week", async (req, res) => {
  //Check for username and password in body
  if (!req.body.username && !req.body.password) {
    return res
      .status(400)
      .send("Please provide your Cookidoo® username and password");
  }

  const userData = {
    username: req.body.username,
    password: req.body.password,
  };

  // Check for nocache param
  const useCache = req.query.nocache !== "";

  let result;
  let cachedResult;

  if (useCache) cachedResult = myCache.get(generateUserId(userData.username));

  if (!cachedResult) {
    let browserInstance = startBrowser();
    result = await scraperController(browserInstance, userData);
  } else {
    console.log("Using cached result");
    result = cachedResult;
  }

  if (!result) {
    return res.status(500).send("Error scraping the Cookidoo website");
  }

  if (useCache) myCache.set(generateUserId(userData.username), result, 86400);

  res.send(result);
});

app.listen(PORT, HOST, () => {
  console.log(`Cookidoo Scraper listening at http://${HOST}:${PORT}`);
});
