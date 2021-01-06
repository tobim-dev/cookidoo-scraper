import got from 'got'
import puppeteer from 'puppeteer'
import {JSDOM} from 'jsdom'

const makeRenderService = () => {
  const renderPage = async (url: string, authCookie?: string) => {
    const gotOptions = authCookie
      ? {
          headers: {
            Cookie: `v-token=${authCookie}`,
            'X-Requested-With': 'xmlhttprequest',
          },
        }
      : {}

    const response = await got.get(url, gotOptions)

    return new JSDOM(response.body, {pretendToBeVisual: true})
  }

  const startBrowser = async (): Promise<puppeteer.Browser> => {
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

  const getAuthentificationCookie = async (username: string, password: string, url: string) => {
    const browser = await startBrowser()

    const page = await browser.newPage()

    await page.goto(url)

    // Landing Page
    await page.waitForSelector(
      '#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__links.unauthenticated-only > li:nth-child(2) > a',
    )
    await page.click(
      '#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__links.unauthenticated-only > li:nth-child(2) > a',
    )

    // Login Page
    await page.waitForSelector('#email')
    await page.$eval('#email', (el: HTMLInputElement, value) => (el.value = value), username)
    await page.$eval('#password', (el: HTMLInputElement, value) => (el.value = value), password)
    await page.click('#j_submit_id')

    //await page.waitForNavigation()

    await page.waitForSelector(
      '#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__main-links > li:nth-child(3) > a',
    )

    const cookies = await page.cookies()

    const authCookie = cookies.find(cookie => cookie.name === 'v-token')

    return authCookie.value
  }

  return {
    renderPage,
    getAuthentificationCookie,
  }
}

const renderService = makeRenderService()

export default renderService
