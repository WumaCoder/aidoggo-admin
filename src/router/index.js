import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./constantRoutes";

Vue.use(VueRouter);

// Solve the error when the routing guard is redirected
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

// Reset route when user logs out
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const createRouter = () =>
  new VueRouter({
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

export default router;
