import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from "../views/LoginView";
import MainView from "../views/MainView";

Vue.use(VueRouter);

const router = new VueRouter({
    mode : 'history',
    routes: [
        {
            path : '/',
            component : MainView
        },
        {
            path : '/login',
            component : LoginView
        },
    ]
});

export default router;