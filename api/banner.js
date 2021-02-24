import request from '@/utils/request'

function findByLimit(){
    return request({
        url: `/crm/banner/limit`,
        method: 'get'
    })
}

export default {
    findByLimit
}