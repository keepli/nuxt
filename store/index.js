import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {  // 返回store为一个函数就行了,nuxt规定
  return new Vuex.Store({
    state: {
      BASE_API: 'http://localhost:9001'
    }
  })
}

export default store