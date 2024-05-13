import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'schedule',
    component: () => import('../views/ScheduleView.vue')
  },
  {
    path: '/device-log',
    name: 'devicelog',
    component: () => import('../views/DeviceLogView.vue')
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: () => import('../views/AttendanceView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
