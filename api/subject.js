import request from '@/utils/request'

function findParentSubject() {
    return request({
      url: `/edu/subject/parent`,
      method: 'get'
    })
}

function findChildrenSubject(pid) {
    return request({
      url: `/edu/subject/children/${pid}`,
      method: 'get'
    })
  }

export default {
    findParentSubject,
    findChildrenSubject
}