/* eslint-disable @typescript-eslint/no-var-requires */
if (process.env.NODE_ENV === 'production') {
  require('./dist')
} else {
  const nodemon = require('nodemon')
  nodemon({
    script: 'dev.ts',
  })
}
