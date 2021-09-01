const fs = require('fs')
const savedJson = fs.readFileSync('./output.json')

const colorTest = () => {
    try {
        let json = JSON.parse(savedJson)

        // Initialize map objects
        let colorResult = []
        let issues = 0
        let boxCount = 0
        let percentageIssue = 0

        // // Loop through each Task
        for (let i in json.docs) {
            let taskId = json.docs[i].task_id
            let boxData = json.docs[i].response.annotations
            boxCount += boxData.length

            colorResult.push({
                TaskId: taskId,
                Errors: []
            })

            // Loop annotations for background color mismatches
            for (let b in boxData) {
                switch (boxData[b].label) {
                    case 'traffic_control_sign':
                        if (
                            boxData[b].attributes.background_color !== 'other'
                        ) {
                            console.log("background_color is not 'other'")
                            colorResult[i].Errors.push({
                                UUID: boxData[b].uuid,
                                SignLabel: 'traffic_control_sign',
                                BackgroundColor:
                                    boxData[b].attributes.background_color,
                                Warning: "'background_color' should be 'other'",
                            })
                            issues++
                        }
                }
            }
        }
        percentageIssue = Math.round((issues/boxCount) * 100)
        colorResult.push({
            TotalBoxes: boxCount,
            TotalIssuesFound: issues,
            PercentageIssues: `${percentageIssue}%`
        })
        console.log(colorResult)

        // Write overlap results to JSON file at root directory
        let formattedJson = JSON.stringify(colorResult)
        fs.writeFile(
            'color-results.json',
            formattedJson,
            'utf8',
            function (err) {
                if (err) {
                    console.log('Error with Overlap JSON file')
                    return console.log(err)
                }
                console.log('Color JSON file saved')
            },
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = { colorTest }
