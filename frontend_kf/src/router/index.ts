import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import routes from './routes';

function isAuthenticated() {
  return !!localStorage.getItem('token'); // Sprawdź, czy token istnieje w localStorage
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    console.log('to', to);
    if (to.path !== '/login' && !isAuthenticated()) {
      next({ path: '/login' });
    } else {
      next();
    }
  });

  return Router;
});
