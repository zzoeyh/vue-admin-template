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
        <el-dropdown-item>退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
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
  console.log(layoutSettingStore.locale)
}
//颜色组件组件的数据
let color = ref('#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  console.log(color.value)
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped></style>
