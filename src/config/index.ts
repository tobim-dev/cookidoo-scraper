import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error && process.env.NODE_ENV === 'development') {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 8000,

  /**
   * Used by winston logger
   */
  logs: {
    level: (process.env.LOG_LEVEL || 'info') as 'info' | 'warn' | 'error',
  },

  /**
   * Cookidoo URLs
   */
  urls: {
    timeline: process.env.COOKIDOO_TIMELINE_URL,
    recipe: process.env.COOKIDOO_RECIPE_BASE_URL,
    base: process.env.COOKIDOO_HOME_URL,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
    swagger: '/api-docs',
  },
}
