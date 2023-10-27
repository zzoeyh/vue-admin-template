//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'

const useConfigStore = defineStore('ConfigStore', {
  state: () => {
    return {
      settingVisible: false, //控制设置面板抽屉
      locale: 'zh-cn',
    }
  },
  actions: {
    setLocale(lang: string) {
      this.locale = lang
    },
    setSettingVisible(bool: boolean) {
      this.settingVisible = bool
    },
  },
})

export default useConfigStore
