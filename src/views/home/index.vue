<template>
  <div>我是一级标题数据</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="scss" scoped></style>
