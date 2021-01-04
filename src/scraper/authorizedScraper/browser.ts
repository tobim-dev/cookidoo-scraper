import puppeteer from 'puppeteer'

async function startBrowser() {
  let browser: puppeteer.Browser
  try {
    console.log('Opening the browser......')
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
      ignoreHTTPSErrors: true,
    })
  } catch (err) {
    console.log('Could not create a browser instance => : ', err)
  }
  return browser
}

export default async function makeBrowser() {
  const browserInstance = await startBrowser()
  return browserInstance
}
