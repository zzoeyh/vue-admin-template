<template>
  <!-- 左侧菜单 -->

  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="LayOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="#409eff"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <!-- layout组件的顶部导航tabbar -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
      <div class="layout_config">
        <Config />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<script setup lang="ts">
//获取路由对象
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import Config from './config/index.vue'
//获取用户Store
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'

let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()
let $route = useRoute()
const MIN_POINT = 992 - 1
const autoCollapsed = () => {
  const isCompact = window.innerWidth <= MIN_POINT
  LayOutSettingStore.setFold(isCompact)
}
onMounted(() => {
  autoCollapsed()
  window.onresize = () => {
    autoCollapsed()
  }
})
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
