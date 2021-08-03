import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      user: { full_name: 'Clark Null' }
    },
    getters: {
      isAuth: state => !!state.user.token
    },
    mutations: {
      updateUser (state) {
        const data = sessionStorage.getItem('user')
        state.user = data ? JSON.parse(data) : {}
      }
    },
    strict: process.env.DEV
  })

  return Store
}
