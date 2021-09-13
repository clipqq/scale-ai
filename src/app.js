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

// COLOR Analysis endpoints
app.get('/color', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            colorTestHandler.colorTest()
        })
        .catch((error) => {
            res.send(error)
        })
    let output = {
        response_type: 'in_channel',
        text: 'Scale AI Color Analysis has been processed. You may view test results here: ',
        attachments: [
            {
                color: '#36a64f',
                author_name: 'Scale AI Testing Bot',
                author_icon: 'https://tinyurl.com/22a79uc5',
                title: 'Color Test Downloadable JSON',
                title_link:
                    'https://lit-escarpment-97177.herokuapp.com/color-results.json',
            },
        ],
    }
    res.json(output)
})

app.get('/color-results.json', (req, res) => {
    let file = './color-results.json'
    res.download(file)
})

// OVERLAP Analysis endpoints
app.get('/overlap', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            overlapTestHandler.overlapTest()
        })
        .catch((error) => {
            res.send(error)
        })
    let output = {
        response_type: 'in_channel',
        text: 'Scale AI Overlap Analysis has been processed. You may view test results here: ',
        attachments: [
            {
                color: '#FF5733',
                author_name: 'Scale AI Testing Bot',
                author_icon: 'https://tinyurl.com/22a79uc5',
                title: 'Overlap Analysis Downloadable JSON',
                title_link:
                    'https://lit-escarpment-97177.herokuapp.com/overlap-results.json',
            },
        ],
    }
    res.json(output)
})
app.get('/overlap-results.json', (req, res) => {
    let file = './overlap-results.json'
    res.download(file)
})

// TIME Analysis endpoints
app.get('/time', (req, res) => {
    apiHandler
        .makeApiCall()
        .then((response) => {
            timeTestHandler.timeTest()
        })
        .catch((error) => {
            res.send(error)
        })
    let output = {
        response_type: 'in_channel',
        text: 'Scale AI Time Analysis has been processed. You may view test results here: ',
        attachments: [
            {
                color: '#ECFF00',
                author_name: 'Scale AI Testing Bot',
                author_icon: 'https://tinyurl.com/22a79uc5',
                title: 'Time Analysis Downloadable JSON',
                title_link:
                    'https://lit-escarpment-97177.herokuapp.com/time-results.json',
            },
        ],
    }
    res.json(output)
})
app.get('/time-results.json', (req, res) => {
    let file = './time-results.json'
    res.download(file)
})

// POST test
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
