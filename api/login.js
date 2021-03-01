import request from '@/utils/request'

function submitLogin(userInfo){
    return request({
        url: `/ucenter/member/login`,
        method: 'post',
        data: userInfo
    })
}

//根据token获取用户信息
function getUserInfo(){
    return request({
        url: `/ucenter/member/info`,
        method: 'get'
    })
}

//根据token获取用户信息
function wxLogin(){
    return request({
        url: `/api/ucenter/wx/login`,
        method: 'get'
    })
}
export default {
    submitLogin,
    getUserInfo,
    wxLogin
}