import request from '@/utils/request'


function findByPage(current,size){
    return request({
        url: `/edu/front/teacher/limit/${current}/${size}`,
        method: 'get'
    })
}

function findById(id){
    return request({
        url: `/edu/front/teacher/${id}`,
        method: 'get'
    })
}

export default {
    findByPage,
    findById
}