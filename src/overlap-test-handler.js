const JSONStream = require('JSONStream')
const fs = require('fs')
const { over } = require('lodash')
const savedJson = fs.readFileSync('./output.json')

const overlapTest = () => {
    try {
        let json = JSON.parse(savedJson)

        // Initialize map objects
        const dataMap = new Map()
        let analysisResult = []
        let analysisMap = new Map()
        let overlapCount = 0
        let boxCount = 0

        // console.log(Object.keys(json))

        // Create truncated Map with just TaskIDs and annotations
        for (let i = 0; i < json.docs.length; i++) {
            let annotations = json.docs[i].response.annotations
            let taskId = json.docs[i].task_id
            // console.log(annotations)
            dataMap.set(taskId, annotations)
        }
        // Loop through each Task
        dataMap.forEach((value, key) => {
            // console.log('Task ID: ' + key)

            analysisResult.push({
                'Task ID': key,
            })
            // Loop through each annotation
            for (let a in value) {
                let boxData = value[a]
                boxCount++
                // console.log(boxData.label)
                // analysisResult.push({
                //     UUID: boxData.uuid,
                //     Label: boxData.label,
                // })

                // Define current box dimensions
                let left = boxData.left
                let top = boxData.top
                let right = boxData.left + boxData.width
                let bottom = boxData.top + boxData.height
                // Loop to compare current box dimensions against all other boxes
                for (let b = 0; b < value.length; b++) {
                    if (
                        value[b].left >= left &&
                        value[b].left <= right &&
                        value[b].top >= top &&
                        value[b].top <= bottom &&
                        value[b].uuid !== boxData.uuid
                    ) {
                        overlapCount++
                        console.log('Found an overlap')
                        analysisResult.push({
                            UUID: boxData.uuid,
                            Warning: 'Overlap detected',
                        })
                    }
                }
            }
        })

        console.log(analysisResult)
        console.log(`Overlap count: ${overlapCount}, Boxes: ${boxCount}`)

        // fs.writeFile('output.json', formattedJson, 'utf8', function (err) {
        //     if (err) {
        //         console.log(
        //             'An error occured while writing JSON Object to File.',
        //         )
        //         return console.log(err)
        //     }
        //     console.log('JSON file has been saved.')
        // })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { overlapTest }
