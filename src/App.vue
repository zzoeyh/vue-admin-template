<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>

  <!-- <router-view></router-view> -->
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import useLayOutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayOutSettingStore()
let lang = ref('zh-cn')
lang.value = layoutSettingStore.locale
const locale = computed(() => (lang.value === 'zh-cn' ? zhCn : en))
watch(
  () => layoutSettingStore.$state.locale,
  (newVal, oldVal) => {
    lang.value = newVal
  },
)
</script>
<style scoped></style>
