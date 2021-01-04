/* eslint-disable @typescript-eslint/no-var-requires */
if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  const dotenv = require('dotenv')
  const nodemon = require('nodemon')
  dotenv.config()
  nodemon({
    script: 'dev.ts',
  })
}
