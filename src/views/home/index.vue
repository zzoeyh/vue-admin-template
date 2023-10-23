<template>
  <div>我是一级标题数据</div>
  <span>{{ t('navBar.home') }}</span>
  <el-table></el-table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="scss" scoped></style>
