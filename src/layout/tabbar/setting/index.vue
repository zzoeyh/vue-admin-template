<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <el-button size="small" circle @click="changeLanguage">
    <svg-icon name="lang" width="15px" height="15px"></svg-icon>
  </el-button>
  <el-button
    size="small"
    icon="Setting"
    circle
    ref="buttonRef"
    @click="configStore.setSettingVisible(true)"
  ></el-button>

  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import useConfigStore from '@/store/modules/config'
import { useI18n } from 'vue-i18n'
import { ClickOutside as vClickOutside } from 'element-plus'
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let configStore = useConfigStore()
const i18 = useI18n()
const buttonRef = ref()
const popoverRef = ref()

//获取路由器对象
let $router = useRouter()
//获取路由对向
let $route = useRoute()
let dark = ref<boolean>(false)
//刷新按钮点击的回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//全屏按钮点击的回调
const fullScreen = () => {
  //DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  //切换成全屏
  if (!full) {
    //文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏
    document.exitFullscreen()
  }
}
const changeLanguage = () => {
  let lang = layoutSettingStore.locale === 'zh-cn' ? 'en' : 'zh-cn'
  layoutSettingStore.setLocale(lang)
  i18.locale.value = lang
}
//退出登录点击回调
const logout = async () => {
  //第一件事情:需要向服务器发请求[退出登录接口]******
  //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
  //第三件事情:跳转到登录页面
  await userStore.userLogout()
  //跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style lang="scss" scoped></style>
