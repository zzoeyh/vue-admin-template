<template>
  <el-drawer
    v-model="drawer"
    title="修改SKU"
    :direction="direction"
    :before-close="handleClose"
  >
    <el-form
      label-position="right"
      label-width="100px"
      :model="data"
      ref="ruleFormRef"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="名称" prop="skuName">
        <el-input v-model="data.skuName" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="data.price" />
      </el-form-item>
      <el-form-item label="描述" prop="skuDesc">
        <el-input v-model="data.skuDesc" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          修改
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const drawer = ref(false)
const props = defineProps(['visible', 'info'])
const emit = defineEmits(['changeVisible', 'changeInfo'])
drawer.value = props.visible
const data = ref<RuleForm>({
  skuName: '',
  price: 0,
  skuDesc: '',
})
data.value = { ...props.info }
const direction = ref('rtl')

interface RuleForm {
  skuName: string
  price: number
  skuDesc: string
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('你确定要关闭吗')
    .then(() => {
      drawer.value = false
      // data.value = { skuName: '', price: 0, skuDesc: '' }
      data.value = { ...props.info }
      emit('changeVisible', false)
      done()
    })
    .catch(() => {
      // catch error
    })
}
const rules = reactive<FormRules<RuleForm>>({
  skuName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  price: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  skuDesc: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      ElMessage.success('修改成功')
      emit('changeInfo', data.value)
      emit('changeVisible', false)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

watch(
  () => props.visible,
  (newVal) => {
    console.log(newVal)
    drawer.value = newVal
  },
)

watch(
  () => props.info,
  (newVal) => {
    data.value = { ...newVal }
  },
)
</script>
