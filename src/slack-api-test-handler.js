let request = require('request')
const fs = require('fs')
const jsonResult = fs.readFileSync('./color-results.json')

let options = {
  'method': 'POST',
  'url': 'https://hooks.slack.com/services/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',
  'headers': {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({"text":`${jsonResult}`})
}

module.exports = {
    getTest: function (url) {
        return new Promise((resolve, reject) => {
            request(options, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            })
        })
    },
}