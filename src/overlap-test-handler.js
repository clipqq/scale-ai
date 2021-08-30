const fs = require('fs')
const savedJson = fs.readFileSync('./output.json')

const overlapTest = () => {
    try {
        let json = JSON.parse(savedJson)

        // Initialize map objects
        const dataMap = new Map()
        let overlapResult = []
        let overlapCount = 0
        let boxCount = 0

        // Create truncated Map with just TaskIDs and annotations
        for (let i = 0; i < json.docs.length; i++) {
            let annotations = json.docs[i].response.annotations
            let taskId = json.docs[i].task_id
            dataMap.set(taskId, annotations)
        }
        // Loop through each Task
        dataMap.forEach((value, key) => {
            overlapResult.push({
                'Task ID': key,
            })

            // Loop through each annotation box
            for (let a in value) {
                let boxData = value[a]
                boxCount++

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
                        overlapResult.push({
                            UUID: boxData.uuid,
                            Warning: 'Overlap detected',
                        })
                    }
                }
            }
        })

        console.log(overlapResult)
        console.log(`Overlap count: ${overlapCount}, Boxes: ${boxCount}`)
        // Write overlap results to JSON file at root directory
        let formattedJson = JSON.stringify(overlapResult)
        fs.writeFile(
            'overlap-results.json',
            formattedJson,
            'utf8',
            function (err) {
                if (err) {
                    console.log('Error with Overlap JSON file')
                    return console.log(err)
                }
                console.log('Overlap JSON file saved')
            },
        )
    } catch (error) {
        console.log(error)
    }
}

module.exports = { overlapTest }
