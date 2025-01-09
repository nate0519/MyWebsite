import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/register', component: Register },
        { path: '/login', component: Login },
        { path: 'dashboard', component: Dashboard, meta: { requiresAuth: true}},
        
    ],
});

router.beforEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    }else {
        next();
    }
});

export default router;