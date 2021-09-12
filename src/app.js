// From here to Line 35, logging and configuration
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston')
const { NODE_ENV } = require('./config')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'info.log',
        }),
    ],
})

if (NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    )
}

const app = express()

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

//////////////////////////////////////////////////////////////////////////

// Require handler modules here
const apiHandler = require('./api-handler')
const outputHandler = require('./output-handler')
const colorTestHandler = require('./color-test-handler')
const overlapTestHandler = require('./overlap-test-handler')
const timeTestHandler = require('./time-test-handler')
const slackApiHandler = require('./slack-api-handler')
const slackTestHandler = require('./slack-api-test-handler')

// Home endpoint
app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.get('/slacktest', (req, res) => {
    slackTestHandler
        .getTest()
        .then((response) => {
            console.log('got slack test')
            res.send(response)
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/slackstatus', (req, res) => {
    slackApiHandler
        .getStatus()
        .then((response) => {
            console.log('got slack response')
            res.send(response)
        })
        .catch((error) => {
            res.send(error)
        })
})

// Endpoint to make API call and write results to JSON file
app.get('/color', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            res.json(response)
            colorTestHandler.colorTest()
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/overlap', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            res.json(response)
            outputHandler.jsonExport(response)
            overlapTestHandler.overlapTest()
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/time', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            res.json(response)
            timeTestHandler.timeTest()
        })
        .catch((error) => {
            res.send(error)
        })
})

// Server error handling
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = {
            error: {
                message: 'server error',
            },
        }
    } else {
        console.error(error)
        response = {
            message: error.message,
            error,
        }
    }
    res.status(500).json(response)
})

module.exports = app
