const express = require('express')
const browserObject = require('./browser');
const scraperController = require('./pageController');

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/', async (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }
    let browserInstance = browserObject.startBrowser();
    const result = await scraperController(browserInstance, userData);
    res.send(result)
})

app.listen(port, () => {
  console.log(`Cookidoo Scraper listening at http://localhost:${port}`)
})