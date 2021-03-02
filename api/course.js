import request from '@/utils/request'

function findByPage(current,size,courseQuery){
    return request({
        url: `/edu/front/course/limit/${current}/${size}`,
        method: 'post',
        data: courseQuery
    })
}

export default {
    findByPage
}