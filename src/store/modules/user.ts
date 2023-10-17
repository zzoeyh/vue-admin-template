import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入路由(常量路由)
import { constantRoute } from '@/router/routes'

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
  //处理异步|逻辑
  actions: {
    //用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      try {
        const result: loginResponseData = await reqLogin(data)
        if (result.code === 200) {
          //pinia仓库存储一下token
          //由于pinia|vuex存储数据其实利用js对象
          this.token = result.data as string
          //本地存储持久化存储一份
          console.log(result.data)
          SET_TOKEN(result.data as string)
          //能保证当前async函数返回一个成功的promise
          return 'ok'
        } else {
          //throw error后调用的vue组件里面可以使用trycatch捕获到异常，因此在调用的地方无需再判断code是否为200
          throw new Error(result.message)
        }
      } catch (err) {
        return Promise.reject(new Error(err))
      }
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储
      try {
        const result = await reqUserInfo()
        this.username = result.data.name
        this.avatar = result.data.avatar
      } catch (err) {
        console.error(err)
      }
    },
  },
  getters: {},
})
//对外暴露
export default useUserStore
