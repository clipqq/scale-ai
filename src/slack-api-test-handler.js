let request = require('request')

let options = {
  'method': 'POST',
  'url': 'https://hooks.slack.com/services/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',
  'headers': {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({"text":"Hello from the app, World!"})
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