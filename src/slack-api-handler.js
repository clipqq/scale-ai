const request = require('request')

// Bringing in parameters from .ENV here
const {
    SLACKAPIURL,
    SLACKAPIKEY,
} = require('./config')

// Setting Url, parameters, and headers here
let statusOptions = {
    method: 'GET',
    url: 'https://status.slack.com/api/v2.0.0/current',
    headers: {
        Authorization: SLACKAPIKEY,
        'Content-Type': 'application/json',
    },
}

let postOptions = {
    method: 'POST',
    url: SLACKAPIURL + '/chat.postMessage',
    headers: {
        Authorization: SLACKAPIKEY,
        'Content-Type': 'application/json',
    },

}


// Making the API call
module.exports = {
    getStatus: function (url) {
        return new Promise((resolve, reject) => {
            request(statusOptions, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            })
        })
    },


}
