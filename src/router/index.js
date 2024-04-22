import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Layout from '../views/layout/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/index.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "loginRegi" */ '../views/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "loginRegi" */ '../views/register/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
