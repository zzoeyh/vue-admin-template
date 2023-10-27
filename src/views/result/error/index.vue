<template>
  <div class="box">
    <el-result
      icon="error"
      title="Error Tip"
      sub-title="Please follow the instructions"
    >
      <template #extra>
        <el-button type="primary" @click="goHome">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>
