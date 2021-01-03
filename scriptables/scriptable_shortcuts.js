const cacheMinutes = 60 // 60 min
const today = new Date()
let result

async function getMealsOfWeek() {
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

await getMealsOfWeek()
return result
