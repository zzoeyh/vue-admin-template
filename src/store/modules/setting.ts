//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refresh: false, //仓库这个属性用于控制刷新效果
      locale: 'zh-cn', //控制国际化功能
    }
  },
  actions: {
    setLocale(lang: string) {
      this.locale = lang
    },
    setFold(fold: boolean) {
      this.fold = fold
    },
  },
})

export default useLayOutSettingStore
