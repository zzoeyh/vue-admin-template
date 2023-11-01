<template>
  <div>
    <el-drawer
      v-model="drawer"
      title="个性化配置"
      :direction="direction"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="设置主题">
          <el-color-picker
            v-model="color"
            size="small"
            @change="setColor"
            :predefine="predefineColors"
            class="color-picker"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import useConfigStore from '@/store/modules/config'
let configStore = useConfigStore()
const drawer = ref(false)
drawer.value = configStore.settingVisible
const direction = ref('rtl')
let dark = ref<boolean>(false)

const handleClose = (done: () => void) => {
  configStore.setSettingVisible(false)
  done()

  /*   ElMessageBox.confirm('你确定要关闭该弹窗吗')
    .then(() => {
      configStore.setSettingVisible(false)
      done()
    })
    .catch(() => {
      // catch error
    }) */
}
function cancelClick() {
  configStore.setSettingVisible(false)
}
function confirmClick() {
  setColor()
  configStore.setSettingVisible(false)
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
  // console.log(color.value)
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

watch(
  () => configStore.settingVisible,
  (newVal, oldVal) => {
    drawer.value = newVal
  },
)
</script>
<style lang="scss" scoped></style>
