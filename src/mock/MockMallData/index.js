import Mock from 'mockjs'

let lst = []

const roomType = [
    '豪华单间',
    '豪华双人房',
    '商务房',
    '总统套房'
]
const occupyType = [
    ''
]

for (let fIndex = 0; fIndex < 9; fIndex++) {
    const floor = {
        floor:fIndex + 1,
        rooms:[]
    }

    for (let rIndex = 0; rIndex < 20; rIndex++) {
        let number = fIndex + 1 + ("" + (rIndex<10 ? ("0" +rIndex) : rIndex.toString()))

        const room = {
            number,
            occupy:Mock.Random.integer(0,1),
            type:roomType[Mock.Random.integer(0,3)],
            name: Mock.Random.cname(),
            date:new Date().toDateString(),
            sex:Mock.Random.integer(0,1)
        }
        floor.rooms.push(room)
    }
    lst.push(floor)
}

function param20bj(url){
    const search = url.split('?')[1]
    if(!search){
        return {}
    }
    //stringJSON转换为Object
    const result = JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') + 
        '"}'
    )

    return result
}

export default {
    getRooms: (config)=>{
        //console.log(lst)
        const {floor,type = 'All'} = param20bj(config.url)

        if(floor == 0) return {code:200, data:lst}
        
        const floorResult = lst.filter(item => item.floor == floor)

        //console.log(floorResult)

        const typeResult = floorResult[0].rooms.filter(item => {
            if(type == 'All') return true
            return item.type === type
        } )

        return {
            code: 200,
            data: typeResult
        }
    }
}