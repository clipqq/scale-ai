const request = require('request')

// Bringing in parameters from .ENV here
const {
    APIURL,
    APIKEY,
    TASK_STATUS,
    PROJECT_NAME,
} = require('./config')

// Setting Url, parameters, and headers here
let options = {
    method: 'GET',
    url: APIURL,
    qs: {
        status: TASK_STATUS,
        project: PROJECT_NAME,
        // customer_review_status: CUSTOMER_REVIEW_STATUS,
    },
    headers: {
        Authorization: APIKEY,
        Accept: 'application/json',
    },
}

// Making the API call
module.exports = {
    makeApiCall: function (url) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            })
        })
    },
}
