import { setBreadcrumbs } from "components/Breadcrumbs/BreadcrumbsUtils";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import constantRoutes from "../router/constantRoutes";
import { addTagView, setTagView } from "components/TagView/TagViewUtils";
import state from "../store/state";

/**
 * Navigation guard and permission verification
 * @param app
 * @param router
 * @param Vue
 * @param store
 * @returns {Promise<void>}
 */
export default async ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // Process TAGVIEW and breadcrumbs after successful login
    handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, Vue);
    // Simulate obtaining token
    const token = sessionStorage.getItem("access_token");
    // There is a token indicating that you have logged in
    if (token) {
      const userRoles = store.getters.getRoles;
      // You cannot access the login interface after logging in
      if (to.path === "/login") {
        next({ path: "/" });
      }
      // debugger;
      // There is user authority, and the route is not empty, then let go
      if (userRoles.length && store.getters.getRoutes.length) {
        // if (!isLoadRoutes) {
        //   router.addRoutes(store.getters.getRoutes);
        //   // If addRoutes is not completed, the guard will execute it again
        //   isLoadRoutes = true;
        //   next({ ...to, replace: true });
        // } else {
        next();
        // }
      }
    } else {
      // go to a route that does not require authorization
      if (
        constantRoutes.some(item => {
          return item.path === to.path;
        })
      ) {
        next();
      } else {
        next({ path: "/logon" });
      }
    }
  });
  router.afterEach(() => {
    // Use multiple stop() to ensure that LoadingBar is properly closed after dynamically adding routes
    LoadingBar.stop();
    LoadingBar.stop();
  });
};

/**
 * Processing tagView and breadcrumbs
 * @param to
 */
function handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, Vue) {
  if (to.name != null) {
    document.title = to.meta.title + Vue.prototype.$title;
    LoadingBar.start();
    // is a public route ?
    for (let i = 0; i < constantRoutes.length; i++) {
      if (constantRoutes[i].path === to.path) {
        return;
      }
    }
    // Determine whether it is a refresh operation,
    // if it is a refresh operation, get the saved tagView information from sessionStorage
    let tagViewOnSS = [];
    JSON.parse(window.sessionStorage.getItem("tagView")) === null
      ? window.sessionStorage.setItem("tagView", "[]")
      : (tagViewOnSS = JSON.parse(window.sessionStorage.getItem("tagView")));
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      setTagView(tagViewOnSS);
      store.commit("SET_KEEPALIVE_LIST", tagViewOnSS);
    } else if (from.fullPath !== to.fullPath) {
      addTagView(to);
    }
    setBreadcrumbs(to.matched, to.query);
    handleKeepAlive(to);
  }
}

/**
 * Handle redundant layout: router-view and keep the current component under the first layer index <router-view>
 * This method cannot filter the on-demand loading <layout> used for nested routing
 * @param to
 */
function handleKeepAlive(to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i];
      if (element.components.default.name === "Layout") {
        to.matched.splice(i, 1);
        handleKeepAlive(to);
      }
    }
  }
}

/**
 * This method can filter on-demand loading <layout> used for nested routing
 * @param to
 */
// async function handleKeepAlive (to) {
//   if (to.matched && to.matched.length > 2) {
//     for (let i = 0; i < to.matched.length; i++) {
//       const element = to.matched[i]
//       if (element.components.default.name === 'Layout') {
//         to.matched.splice(i, 1)
//         await handleKeepAlive(to)
//       }
//       if (typeof element.components.default === 'function') {
//         await element.components.default()
//         await handleKeepAlive(to)
//       }
//     }
//   }
// }
