import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Layout from '@/views/layout/index.vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';

Vue.use(VueRouter);

const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
      hidden: false,
    },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          hidden: false,
        },
        component: () => import(/* webpackChunkName: "product" */ '@/views/productList/index.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
          hidden: false,
        },
        component: () => import(/* webpackChunkName: "product" */ '@/views/productList/productAdd.vue'),
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          hidden: true,
        },
        component: () => import(/* webpackChunkName: "product" */ '@/views/productList/productEdit.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          icon: 'unordered-list',
          hidden: false,
        },
        component: () => import(/* webpackChunkName: "category" */ '@/views/category/index.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '统计',
          icon: 'number',
          hidden: false,
        },
        component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
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
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
      hidden: true,
    },
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  const whiteList = ['/login', '/register'];
  if (whiteList.indexOf(to.path) === -1) {
    if (store.getters.user.appkey && store.getters.user.username && store.getters.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.getters.user.role, asyncRouterMap);
        store.dispatch('menu/changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          // router.addRoute(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    // if (store.getters.user.appkey && store.getters.user.username && store.getters.user.role) {
    //   return next();
    return next('/login');
  }
  return next();
});

export default router;
