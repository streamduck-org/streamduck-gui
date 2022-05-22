import Vue from 'vue'
import VueRouter from 'vue-router'

import LoadingPage from '../views/LoadingPage.vue'
import DeviceList from "../views/DeviceList.vue"
import DeviceEditor from "../views/DeviceEditor.vue"
import LayoutEditor from "../views/editor/LayoutEditor"
import DeviceSettings from "../views/editor/DeviceSettings";

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
        path: '/device',
        name: "Device",
        component: DeviceEditor,
        props: true,
        children: [
            {
                path: '/editor',
                name: 'LayoutEditor',
                component: LayoutEditor,
                props: true,
            },
            {
                path: '/settings',
                name: 'DeviceSettings',
                component: DeviceSettings,
                props: true,
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
