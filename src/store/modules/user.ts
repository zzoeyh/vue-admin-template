import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'

import router from '@/router'
// 合并通用路由和用户各自获取的权限路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: [],
    }
  },
  actions: {
    //用户登录
    async userLogin(data: loginFormData) {
      //登录请求
      try {
        if (data.username === 'admin' && data.password === '111111') {
          const result = {
            code: 200,
            data: 'ADMIN',
          }
          this.token = result.data as string
          SET_TOKEN(result.data as string)
        } else if (data.username === 'user' && data.password === '111111') {
          const result = {
            code: 200,
            data: 'USER',
          }
          this.token = result.data as string
          SET_TOKEN(result.data as string)
        } else {
          throw new Error('用户名或密码错误')
        }
        // const result: loginResponseData = await reqLogin(data)
        // if (result.code === 200) {
        //   // 存储token
        //   this.token = result.data as string
        //   SET_TOKEN(result.data as string)
        //   return 'ok'
        // } else {
        //   throw new Error(result.data)
        // }
      } catch (err) {
        return Promise.reject(err)
      }
    },
    //获取用户信息
    async userInfo() {
      //获取用户信息进行存储
      try {
        // const result = await reqUserInfo()
        let result = { data: {} }
        if (GET_TOKEN() === 'ADMIN') {
          result = {
            data: {
              name: 'admin',
              avatar: '/avatar.png',
              routes: [
                'Product',
                'Spu',
                'Sku',
                'Manage',
                'Role',
                'Permission',
                'User',
              ],
            },
          }
        } else {
          result = {
            data: {
              name: 'user',
              avatar: '/avatar.png',
              routes: ['Product', 'Spu', 'Sku'],
            },
          }
        }

        const myAsnycRoute = [...asnycRoute]
        this.username = result.data.name
        this.avatar = result.data.avatar
        const userAsyncRoute = filterAsyncRoute(
          myAsnycRoute,
          result.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
      } catch (err) {
        console.error(err)
      }
    },
    //退出登录
    async userLogout() {
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
//对外暴露
export default useUserStore
