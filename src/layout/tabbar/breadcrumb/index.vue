<template>
  <!-- 顶部左侧的图标 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧的面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
      v-show="item.meta.title"
    >
      <el-icon>
        <component :is="item.meta.icon" v-if="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0px 3px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
//获取layout配置相关的仓库
import { useRoute } from 'vue-router'
//获取路由对象
let $route = useRoute()
let LayOutSettingStore = useLayOutSettingStore()

//点击图标的切换
const changeIcon = () => {
  //图标进行切换
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style lang="scss" scoped></style>
