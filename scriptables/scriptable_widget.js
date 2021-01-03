const cacheMinutes = 60 // 60 min
const today = new Date()
let result
let widget = new ListWidget()
widget.setPadding(8, 8, 8, 8)

await getMealOfToday()
await createWidget()
Script.setWidget(widget)
Script.complete()

if (config.runsInApp) {
  widget.presentSmall()
}

async function createWidget() {
  let day = today.getDate().toString()

  const upperStack = widget.addStack()
  upperStack.layoutHorizontally()

  let image = await getImage('meal.png')

  let logoImage = upperStack.addImage(image)
  logoImage.imageSize = new Size(60, 60)

  upperStack.addSpacer(12)

  let calendarStack = upperStack.addStack()
  calendarStack.layoutVertically()
  calendarStack.addSpacer(4)
  let dayNameText = calendarStack.addText(getWeekday(today).toUpperCase())
  dayNameText.textColor = Color.red()
  if (getWeekday(today) === 'Donnerstag') {
    dayNameText.font = Font.boldSystemFont(8)
  } else {
    dayNameText.font = Font.boldSystemFont(10)
  }

  let spacer = '  '
  if (day < 10) {
    spacer = '   '
  }
  let dayText = calendarStack.addText(spacer + day)
  dayText.font = Font.semiboldSystemFont(26)

  let dateText = calendarStack.addText(getMonthName(today))
  dateText.font = Font.boldSystemFont(11)

  widget.addSpacer(8)

  let staticText = widget.addText('Heutige Mahlzeit:')
  staticText.font = Font.boldSystemFont(11)

  console.log(result[0].name)

  let mealNameText = widget.addText(result[0].name)
  mealNameText.font = Font.boldSystemFont(16)
  widget.addSpacer(3)

  let recipeCalories = widget.addText(
    `${result[0].energy.kcal} kcal pro Portion`,
  )
  recipeCalories.textColor = Color.gray()
  recipeCalories.font = Font.mediumSystemFont(10)

  widget.addSpacer(1)

  let recipePortions = widget.addText(`${result[0].numberOfPortions} Portionen`)
  recipePortions.textColor = Color.gray()
  recipePortions.font = Font.mediumSystemFont(10)

  widget.url = `https://cookidoo.de/recipes/recipe/de-DE/${result[0].recipeId}`
}

function getWeekday(date) {
  var weekday = new Array(7)
  weekday[0] = 'Sonntag'
  weekday[1] = 'Montag'
  weekday[2] = 'Dienstag'
  weekday[3] = 'Mittwoch'
  weekday[4] = 'Donnerstag'
  weekday[5] = 'Freitag'
  weekday[6] = 'Samstag'

  return weekday[date.getDay()]
}

function getMonthName(date) {
  var monthName = new Array(12)
  monthName[0] = '   Januar'
  monthName[1] = '   Februar'
  monthName[2] = '     März'
  monthName[3] = '     April'
  monthName[4] = '      Mai'
  monthName[5] = '     Juni'
  monthName[6] = '     Juli'
  monthName[7] = '  August'
  monthName[8] = 'September'
  monthName[9] = ' Oktober'
  monthName[10] = 'November'
  monthName[11] = 'Dezember'

  return monthName[date.getMonth()]
}

// get images from iCloud or download them once
async function getImage(image) {
  let fm = FileManager.local()
  let dir = fm.documentsDirectory()
  let path = fm.joinPath(dir, image)
  if (fm.fileExists(path)) {
    return fm.readImage(path)
  } else {
    // download once
    let imageUrl
    switch (image) {
      case 'meal.png':
        imageUrl =
          'https://cdn2.iconfinder.com/data/icons/international-food/64/hor_mok-64.png'
        break
      default:
        console.log(`Sorry, couldn't find ${image}.`)
    }
    let req = new Request(imageUrl)
    let loadedImage = await req.loadImage()
    fm.writeImage(path, loadedImage)
    return loadedImage
  }
}

async function getMealOfToday() {
  // Set up the file manager.
  const files = FileManager.local()

  // Set up cache
  const cachePath = files.joinPath(files.cacheDirectory(), 'api-meals-of-week') // ggfs. namen anpassen
  const cacheExists = files.fileExists(cachePath)
  const cacheDate = cacheExists ? files.modificationDate(cachePath) : 0

  // Get Data
  try {
    // If cache exists and it's been less than 60 minutes since last request, use cached data.
    if (
      cacheExists &&
      today.getTime() - cacheDate.getTime() < cacheMinutes * 60 * 1000
    ) {
      console.log('Get from Cache')
      result = JSON.parse(files.readString(cachePath))
    } else {
      console.log('Get from API')
      const body = {
        username: '<USERNAME>',
        password: '<PASSWORD>',
      }
      const req2 = new Request('<URL>')
      req2.method = 'POST'
      req2.headers = {'Content-Type': 'application/json'}
      req2.body = JSON.stringify(body)

      result = await req2.loadJSON()
      console.log('Write Data to Cache')
      try {
        files.writeString(cachePath, JSON.stringify(result))
      } catch (e) {
        console.log('Creating Cache failed!')
        console.log(e)
      }
    }
  } catch (e) {
    console.error(e)
    if (cacheExists) {
      console.log('Get from Cache')
      result = JSON.parse(files.readString(cachePath))
    } else {
      console.log('No fallback to cache possible. Due to missing cache.')
    }
  }
  console.log(result)
}
