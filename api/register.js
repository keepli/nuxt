import request from '@/utils/request'

function sendCode(phone){
    return request({
        url: `/sms/send/${phone}`,
        method: 'get'
    })
}

function registerUser(registerParam){
    return request({
        url: `/ucenter/member/register`,
        method: 'post',
        data: registerParam
    })
}

export default {
    sendCode,
    registerUser
}