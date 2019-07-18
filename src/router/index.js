import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login'
import mypage from '@/components/Mypage'
import store from '../store'

Vue.use(Router)

const rejectAuthUser = (to, from, next) => {
  if(store.state.isLogin === true) {
    // 이미 로그인 된 유저이기 때문에 접속 막아놓음
    alert('이미 로그인을 하였습니다.')
    next('/')
  } else {
    next()
  }
}
const onlyAuthUser = (to, from, next) => {
  if(store.state.isLogin === false) {
    // 아직 로그인이 안 된 유저이기 때문에 접속 막아놓음
    alert('로그인을 해주세요.')
    next('/')
  } else {
    next()
  }
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: rejectAuthUser,
      component: login
    },
    {
      path: '/mypage',
      name: 'mypage',
      beforeEnter: onlyAuthUser,
      component: mypage
    }
  ]
})
