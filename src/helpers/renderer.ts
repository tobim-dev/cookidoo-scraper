import got from 'got'
import puppeteer from 'puppeteer'
import {JSDOM} from 'jsdom'

type renderOptions = {
  authCookie?: string
  headerValues?: {}
}

const makeRenderer = () => {
  const renderPage = async (url: string, {authCookie, headerValues}: renderOptions = {}) => {
    const gotOptions = authCookie
      ? {
          headers: {
            Cookie: `v-token=${authCookie}`,
            ...headerValues,
          },
        }
      : {}

    const response = await got.get(url, gotOptions)

    if (response.statusCode !== 200) return null

    return new JSDOM(response.body)
  }

  const startBrowser = async (): Promise<puppeteer.Browser> => {
    let browser: puppeteer.Browser
    try {
      console.log('Opening browser...')
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

    console.log('Getting authentification cookie...')

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
    await page.click('button[type="submit"]')

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

const renderer = makeRenderer()

export default renderer
