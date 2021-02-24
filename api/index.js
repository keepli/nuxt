import request from '@/utils/request'

function findIndexData(){
    return request({
        url: `/edu/front/index`,
        method: 'get'
    })
}

export default {
    findIndexData
}