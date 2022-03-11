import Vue from 'vue'
import VueRouter from 'vue-router'

import LoadingPage from '../views/LoadingPage.vue'
import DeviceList from "../views/DeviceList.vue"
import DeviceEditor from "../views/DeviceEditor.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'LoadingPage',
        component: LoadingPage
    },
    {
        path: '/device-list',
        name: "DeviceList",
        component: DeviceList
    },
    {
        path: '/device-editor',
        name: "DeviceEditor",
        component: DeviceEditor
    }
]

const router = new VueRouter({
    routes
})

export default router
