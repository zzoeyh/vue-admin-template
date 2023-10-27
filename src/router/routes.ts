//对外暴露配置路由(常量路由)
export const constantRoute = [
  {
    //登录路由
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },

  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
  // {
  //   //重定向
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   name: 'Any',
  // },
  {
    path: '/result',
    component: () => import('@/layout/index.vue'),
    name: 'Result',
    meta: {
      title: '结果页',
      icon: 'CircleCheck',
    },
    redirect: '/result/error',
    children: [
      {
        path: '/result/error',
        component: () => import('@/views/result/error/index.vue'),
        name: 'Error',
        meta: {
          title: '错误页',
          icon: 'CircleClose',
        },
      },
      {
        path: '/result/success',
        component: () => import('@/views/result/success/index.vue'),
        name: 'Success',
        meta: {
          title: '成功页',
          icon: 'CircleCheck',
        },
      },
    ],
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },

      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
  {
    path: '/manage',
    component: () => import('@/layout/index.vue'),
    name: 'Manage',
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/manage/user',
    children: [
      {
        path: '/manage/user',
        component: () => import('@/views/manage/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/manage/role',
        component: () => import('@/views/manage/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/manage/permission',
        component: () => import('@/views/manage/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
]

//任意路由
//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}

// let guigu333 = ['Product', 'Trademark', 'Sku']
// function filterAsyncRoute(asnycRoute, routes) {
//   return asnycRoute.filter((item) => {
//     if (routes.includes(item.name)) {
//       if (item.children && item.children.length > 0) {
//         item.children = filterAsyncRoute(item.children, routes)
//       }
//       return true
//     }
//   })
// }
// console.log('before',asnycRoute)

// //硅谷333需要展示的异步路由
// let guigu333Result = filterAsyncRoute(asnycRoute, guigu333)
// console.log('after',asnycRoute)
// console.log([...constantRoute, ...guigu333Result, anyRoute], '硅谷333')
