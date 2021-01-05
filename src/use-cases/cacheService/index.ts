import NodeCache from 'node-cache'
import {generateMidnightInValidKey} from './keyGenerator'
import makeCache from './cacheFactory'

const hourCache = new NodeCache({stdTTL: 3600})
const dayCache = new NodeCache({stdTTL: 86400})

const cacheWithOneHourDuration = makeCache({cache: hourCache})
const cacheWithOneDayDurationAndMidnightReset = makeCache({cache: dayCache, keyGenerator: generateMidnightInValidKey})

const cacheService = Object.freeze({
  getValue: cacheWithOneHourDuration.getValue,
  setValue: cacheWithOneHourDuration.setValue,
  getValueDayValid: cacheWithOneDayDurationAndMidnightReset.getValue,
  setValueDayValid: cacheWithOneDayDurationAndMidnightReset.setValue,
})

export default cacheService
