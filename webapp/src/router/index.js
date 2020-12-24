import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import dashboard from '../views/dashboard.vue'
import store from '../util/store'

Vue.use(VueRouter)
/**
 * report errors when modify the first page route with repeated clicks
*/
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta:{auth:true},
    children: [
      {
        path: 'Search',
        name:'Search',
        component: Search,
      },
      {
        path: 'userlog',
        name: 'userlog',
        component: () => import(/* webpackChunkName: "about" */ '../views/userlog.vue')
      }
    ]
  },
  // {
  //   path: '/Result',
  //   name: 'Result',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Result.vue')
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Navigation Guards
router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    if(!store.user){
      next({
        name:""
      });
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router
