const scrapeRecipiesInWeekplan = async (browser, userData, url) => {
  const page = await browser.newPage()
  console.log(`Navigating to ${url}...`)
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
  await page.$eval(
    '#email',
    (el, value) => (el.value = value),
    userData.username,
  )
  await page.$eval(
    '#password',
    (el, value) => (el.value = value),
    userData.password,
  )
  await page.click('#j_submit_id')

  await page.waitForNavigation()

  const error = await page.$('#j_login_form_id > div.errorMessage')

  if (error) {
    await browser.close()
    return null
  }

  // Login Starter Page
  await page.waitForSelector(
    '#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__main-links > li:nth-child(3) > a',
  )
  await page.click(
    '#layout--default > header > div > core-nav > nav > div.core-nav__container > ul.core-nav__main-links > li:nth-child(3) > a',
  )

  // Week Page
  await page.waitForSelector(
    '#main > plan-timeline > section > plan-timeline-entry:nth-child(1) > article > core-tiles-list > core-tile > a',
  )

  const recipeIdList = await page.$$eval('core-tile > a', links => {
    const recipeIds = links.map(el => el.href.split('/').pop())
    return recipeIds
  })

  await browser.close()

  return recipeIdList
}

export {scrapeRecipiesInWeekplan}
