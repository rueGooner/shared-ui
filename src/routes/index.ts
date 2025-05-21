import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from @/pages/Login.vue';
import RegisterComponent from '@/pages/Register.vue';

const routes = [
    { path: '/login', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
