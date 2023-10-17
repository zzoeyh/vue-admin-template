//路由鉴权：鉴权：项目当中路由能不能被访问的权限
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//进度条的加载圆圈不要
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据，去判断用户是否登陆成功
import useUserStore from './store/modules/user'
//为什么要引pinia
import pinia from './store'
const userStore = useUserStore(pinia)

//全局前置守卫
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username

  if (token) {
    if (to.path == '/login') {
      next('/home')
      return // 终止函数执行，避免多次调用 next()
    } else {
      if (username) {
        next()
        return // 终止函数执行，避免多次调用 next()
      } else {
        try {
          await userStore.userInfo()
          next()
          return // 终止函数执行，避免多次调用 next()
        } catch (error) {
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
          return // 终止函数执行，避免多次调用 next()
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
      return // 终止函数执行，避免多次调用 next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
      return // 终止函数执行，避免多次调用 next()
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done()
})

//第一个问题：任意路由切换实现进度条业务 ----nprogress
//第二个问题：路由鉴权
//全部路由组件 ：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（4个子路由）

//用户未登录 ：可以访问login 其余都不行
//登陆成功：不可以访问login 其余都可以
