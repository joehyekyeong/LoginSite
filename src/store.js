import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        allUsers:[
            {id: 1, name:'num', email:'num@gmail.com', password: '123'},
            {id: 2, name:'nam', email:'nam@gmail.com', password: '123'}
        ],
        isLogin: false,
        isLoginError: false
    },
    mutations: {
        // 로그인을 성공했을 때,
        loginSuccess(state, payload){
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        // 로그인을 실패했을 때
        loginError(state){
            state.isLogin = false
            state.isLoginError = true
        }
    }, //state 값을 변화 시키는 것
    actions: {
        // 로그인 시도
        login({ state, commit }, loginObj) {
            let selectedUser = null
            state.allUsers.forEach(user => {
                if(user.email === loginObj.email) selectedUser = user
            })
            // selectedUser === null 
            //     ? commit("loginError") // null 이면 에러가 true
            //     : selectedUser.password !== loginObj.password
            //      ? commit("loginError")
            //      : commit("loginSuccess")
            if (selectedUser === null || selectedUser.password !== loginObj.password)
                commit("loginError")
            else {
                commit("loginSuccess", selectedUser)
                router.push({ name: "mypage" })
            }
        }
    }
})