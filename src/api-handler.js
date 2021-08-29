const request = require('request')
const { APIURL, APIKEY } = require('./config')
let options = {
    method: 'GET',
    url: APIURL,
    headers: {
        Authorization: APIKEY,
        Accept: 'application/json',
    },
}
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
