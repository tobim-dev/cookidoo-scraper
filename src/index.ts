import logger from 'loglevel'
import config from './config'
import {startServer} from './start'
logger.setLevel(config.logs.level)
startServer()
