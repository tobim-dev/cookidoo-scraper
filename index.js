if (process.env.NODE_ENV === 'production') {
  import './dist'
} else {
  import dotenv from 'dotenv'
  import nodemon from 'nodemon'
  dotenv.config()
  nodemon({
    script: 'dev.js',
  })
}
