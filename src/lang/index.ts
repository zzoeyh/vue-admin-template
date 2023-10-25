import { createI18n } from 'vue-i18n'
import type { I18n, Composer } from 'vue-i18n'
import elementZhcnLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementEnLocale from 'element-plus/lib/locale/lang/en'
import useConfigStore from '@/store/modules/config'
import commonEn from '@/lang/common/en/index'
import commonZh from '@/lang/common/zh-cn/index'
import viewsZh from '@/lang/views/zh-cn/index'
import viewsEn from '@/lang/views/en/index'

let configStore = useConfigStore()
//思考：引入多个文件时怎么做更优雅，如果不切换语言包，能不能按需引入
const messages = {
  en: {
    ...commonEn,
    ...viewsEn,
  },
  'zh-cn': {
    ...commonZh,
    ...viewsZh,
  },
}
// 进行持久化处理，防止在页面刷新之后数据丢失
const getLanguage = () => {
  return configStore.$state.locale
}
const i18n = createI18n({
  legacy: false, // 使用composition API
  locale: getLanguage(), //默认值
  globalInjection: true, // 表明使用全局t函数
  messages,
})

export default i18n //将i18函数导出
