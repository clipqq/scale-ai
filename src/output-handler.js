const fs = require('fs')

module.exports = {
    jsonExport: function (data) {
        let rawJson = data

        // parse json
        let parsedJson = JSON.parse(rawJson)
        console.log(parsedJson)

        // stringify JSON Object
        let formattedJson = JSON.stringify(parsedJson)
        console.log(formattedJson)

        fs.writeFile('output.json', formattedJson, 'utf8', function (err) {
            if (err) {
                console.log(
                    'An error occured while writing JSON Object to File.',
                )
                return console.log(err)
            }
            console.log('JSON file has been saved.')
        })
    },
}
