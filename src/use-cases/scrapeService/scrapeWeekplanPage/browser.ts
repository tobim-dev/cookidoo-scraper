import puppeteer from 'puppeteer'

async function startBrowser(): Promise<puppeteer.Browser> {
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

export default async function makeBrowser(): Promise<puppeteer.Browser> {
  const browserInstance = await startBrowser()
  return browserInstance
}
