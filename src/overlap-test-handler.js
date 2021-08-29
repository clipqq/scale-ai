const overlapTest = (data) => {
    try {
        console.log('overlap ran')
        let json = data
        // let json = JSON.parse(data)

        // const dataMap = new Map()

        // console.log(Object.keys(json))

        // let nestJson = json.docs
        // for (let a in nestJson) {
        //     for (let b in nestJson[a]) {
        //         console.log(nestJson[a][b])
        //     }
        // }

        console.log(json)

    } catch (error) {
        console.log(error)
        throw new Error(console.log('Overlap Error'))
    }
}

module.exports = { overlapTest }