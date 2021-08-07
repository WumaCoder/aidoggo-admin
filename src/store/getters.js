const getters = {
  getRoles: state => {
    return state.currentUser.roles;
  },
  getRoutes: state => {
    return state.routes;
  },
  getTagView: state => {
    return state.tagView;
  },
  getBreadcrumbs: state => {
    return state.breadcrumbs;
  },
  getKeepAliveList: state => {
    return state.keepAliveList;
  }
};

export default getters;
