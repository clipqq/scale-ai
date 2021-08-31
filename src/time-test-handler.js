const { time } = require('console')
const fs = require('fs')
const savedJson = fs.readFileSync('./output.json')

const timeTest = () => {
    try {
        let json = JSON.parse(savedJson)

        // Initialize map objects
        const dataMap = new Map()
        let overlapResult = []
        let overlapCount = 0
        let boxCount = 0
        let timeResult = []
        let timeAcrossTasks = 0

        // Create truncated Map with just TaskIDs and annotations
        for (let i = 0; i < json.docs.length; i++) {
            let createTime = new Date(json.docs[i].created_at)
            let completeTime = new Date(json.docs[i].completed_at)

            let annotations = json.docs[i].response.annotations
            let taskId = json.docs[i].task_id
            // dataMap.set(taskId, annotations)

            // Calculate total time
            let totalTimeRaw = Math.abs(completeTime) - Math.abs(createTime)

            // Convert to minutes
            let totalTime = Math.floor(totalTimeRaw / 1000 / 60)

            // Calc time spent per box
            let boxNum = annotations.length
            boxCount += boxNum
            let timePerBox = totalTime / boxNum
            timeAcrossTasks += totalTime

            // console.log(dataMap)
            // console.log(createTime)
            // console.log(completeTime)
            // console.log(`Task: ${taskId}, Time: ${totalTime} mins`)

            // Insert data into results array
            timeResult.push({
                TaskID: taskId,
                TotalMins: totalTime,
                NumberOfBoxes: boxNum,
                MinsPerBox: timePerBox,
                Warning: 'None',
            })
        }
        // // Loop through each Task
        // dataMap.forEach((value, key) => {
        //     overlapResult.push({
        //         'Task ID': key,
        //     })

        //     //Loop through each annotation box
        //     for (let a in value) {
        //         let boxData = value[a]
        //         // boxCount++

        //         // Define current box dimensions
        //         let left = boxData.left
        //         let top = boxData.top
        //         let right = boxData.left + boxData.width
        //         let bottom = boxData.top + boxData.height

        //         // Loop to compare current box dimensions against all other boxes
        //         for (let b = 0; b < value.length; b++) {
        //             if (
        //                 value[b].left >= left &&
        //                 value[b].left <= right &&
        //                 value[b].top >= top &&
        //                 value[b].top <= bottom &&
        //                 value[b].uuid !== boxData.uuid
        //             ) {
        //                 overlapCount++
        //                 overlapResult.push({
        //                     UUID: boxData.uuid,
        //                     Warning: 'Overlap detected',
        //                 })
        //             }
        //         }
        //     }
            
        // })

        let avgTimePerBox = timeAcrossTasks / boxCount
        // console.log(timeResult)
        console.log(
            `Boxes: ${boxCount}, Total Time: ${timeAcrossTasks}, Avg time per Box: ${avgTimePerBox}`,
        )

        // Add warning to results array if average time for Task
        // was less than half of the average for all Tasks
        for (let i in timeResult) {
            if (timeResult[i].MinsPerBox < avgTimePerBox / 2) {
                timeResult[i].Warning =
                    'Time spent per box significantly lower than expected'
            }
        }

        // Write overlap results to JSON file at root directory
        let formattedJson = JSON.stringify(timeResult)
        fs.writeFile(
            'time-results.json',
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

module.exports = { timeTest }
