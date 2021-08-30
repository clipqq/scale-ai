const fs = require('fs')

module.exports = {
    jsonExport: function (data) {
        // Parse and stringify JSON
        let parsedJson = JSON.parse(data)
        let formattedJson = JSON.stringify(parsedJson)

        // Write formatted data to `output.json` at root level directory
        fs.writeFile('output.json', formattedJson, 'utf8', function (err) {
            if (err) {
                console.log(
                    'Error with Raw API output JSON',
                )
                return console.log(err)
            }
            console.log('Raw API output JSON file saved')
        })
    },
}
