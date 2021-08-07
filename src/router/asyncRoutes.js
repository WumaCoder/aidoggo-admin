import Layout from "../components/Layout/Layout";

/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: "/",
    name: "Home",
    meta: {
      roles: ["超级管理员", "test"],
      title: "数据统计",
      icon: "bar_chart",
      keepAlive: true
    },
    component: () => import("../pages/home/home.vue")
  },
  {
    path: "/user",
    name: "User",
    meta: {
      roles: ["超级管理员"],
      title: "用户管理",
      icon: "admin_panel_settings",
      isOpen: true
    },
    component: Layout,
    children: [
      {
        path: "account",
        name: "UserAccount",
        meta: {
          roles: ["超级管理员"],
          title: "账号管理",
          icon: "person",
          keepAlive: true
        },
        component: () => import("../pages/user/account")
      },
      {
        path: "role",
        name: "UserRole",
        meta: {
          roles: ["超级管理员"],
          title: "角色管理",
          icon: "verified_user",
          keepAlive: true
        },
        component: () => import("../pages/user/role")
      },
      {
        path: "route",
        name: "UserRoute",
        meta: {
          roles: ["超级管理员"],
          title: "权限管理",
          icon: "link",
          keepAlive: true
        },
        component: () => import("../pages/user/route")
      }
    ]
  },
  {
    path: "/service",
    name: "Service",
    meta: {
      roles: ["超级管理员"],
      title: "服务管理",
      icon: "extension",
      isOpen: true
    },
    component: Layout,
    children: [
      {
        path: "docker",
        name: "ServiceDocker",
        meta: {
          roles: ["超级管理员"],
          title: "容器管理",
          icon: "view_module",
          keepAlive: true
        },
        component: () => import("../pages/service/docker")
      },
      {
        path: "config",
        name: "ServiceConfig",
        meta: {
          roles: ["超级管理员"],
          title: "配置管理",
          icon: "format_list_bulleted",
          keepAlive: true
        },
        component: () => import("../pages/service/config")
      },
      {
        path: "route",
        name: "ServiceRoute",
        meta: {
          roles: ["超级管理员"],
          title: "路由管理",
          icon: "alt_route",
          isHidden: true,
          keepAlive: true
        },
        component: () => import("../pages/service/config")
      }
    ]
  },
  {
    path: "/image",
    name: "Image",
    meta: {
      roles: ["超级管理员"],
      title: "图片管理",
      icon: "image",
      isOpen: true
    },
    component: Layout,
    children: [
      {
        path: "user",
        name: "ImageUser",
        meta: {
          roles: ["超级管理员"],
          title: "用户图片",
          icon: "camera_alt",
          keepAlive: true
        },
        component: () => import("../pages/image/user")
      },
      {
        path: "apply",
        name: "ImageApply",
        meta: {
          roles: ["超级管理员"],
          title: "审批图片",
          icon: "approval",
          keepAlive: true
        },
        component: () => import("../pages/image/apply")
      }
    ]
  },
  {
    path: "/material",
    name: "Material",
    meta: {
      roles: ["超级管理员"],
      title: "文章管理",
      icon: "book"
    },
    component: () => import("../pages/material/material")
  },
  {
    path: "/message",
    name: "Message",
    meta: {
      roles: ["超级管理员"],
      title: "消息管理",
      icon: "markunread_mailbox"
    },
    component: () => import("../pages/message/message")
  },
  {
    path: "*", // 此处需置于最底部
    redirect: "/NoFound404",
    meta: {
      roles: ["超级管理员"],
      isHidden: true
    }
  }
];

const asyncRoutes = [
  {
    path: "/",
    name: "index",
    redirect: "/",
    component: () => import("../layouts/MainLayout"),
    children: asyncRoutesChildren
  }
];

export default asyncRoutes;

export { asyncRoutesChildren };
