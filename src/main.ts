import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import gloablComponent from './components/index'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
// import '@/styles'
createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(gloablComponent)
  .use(router)
  .use(pinia)
  .mount('#app')
