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
const { App } = require('@slack/bolt')
const app = express()
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// const slackApp = new App({
//     signingSecret: process.env.SLACK_SIGNING_SECRET,
//     token: process.env.SLACK_BOT_TOKEN,
//   });

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
            return response
        })
        .catch((error) => {
            res.send(error)
        })
})

app.get('/color-results.json', (req, res) => {
    let file = ('./color-results.json')
    res.download(file)
})


// Endpoint to make API call and write results to JSON file
app.get('/color', (req, res) => {
    let output = {}
    apiHandler
        .makeApiCall()
        .then((response) => {
            // res.json(response)
            colorTestHandler.colorTest()
            let output = {
                response_type: 'in_channel',
                text: 'Color Test Here: ',
                attachments: ['https://lit-escarpment-97177.herokuapp.com/color-results.json'],
            }
            res.json(output)
        })
        res.json(output)
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

// Handle POSTs
app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body)
    let data = {
        response_type: 'in_channel',
        text: 'Got your command!',
        attachments: [
            {
                image_url:
                    'https://www.pcgamesn.com/wp-content/uploads/2021/09/knights-of-the-old-republic-remake-pc-580x334.jpg',
            },
        ],
    }
    res.json(data)
})

app.post('/slack-status', (req, res) => {
    let data = {
        response_type: 'in_channel',
        text: `Here's the status:${status}`,
    }
    res.json(data)
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
