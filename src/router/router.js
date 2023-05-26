import {createRouter,createWebHistory} from "vue-router";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        // {
        //     path:"/chat",
        //     name:"chat",
        //     component:() => import("../components/index.vue"),
        // },
        // {
        //     path:"/",
        //     redirect:"chat",
        // },
        {
            path:"/",
            name:"chat",
            component:() => import("../components/index.vue"),
        },

    ]
})

export default router;