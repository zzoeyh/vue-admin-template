<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <!-- 表格组件，用于展示已有的数据 -->
    <!-- 
      table
      ---border:是否有纵向的边框
      table-column
      ---lable：某一个列表
      ---width：设置这一列的宽度
      ---align：设置这一列对齐方式
     -->
    <el-table style="margin: 10px 0px" border>
      <el-table-column
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌名称"></el-table-column>
      <el-table-column label="品牌LOGO"></el-table-column>
      <el-table-column label="品牌操作"></el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <!-- 
      pagination
      ---v-model:current-page：设置当前分页器页码
      ---v-model:page-size:设置每一也展示数据条数
      ---page-sizes：每页显示个数选择器的选项设置
      ---background:背景颜色
      ---layout：分页器6个子组件布局的调整 "->"把后面的子组件顶到右侧
     -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { reqHasTrademark } from '@/api/product/trademark'
import { ElMessage } from 'element-plus'
//引入组合式API函数
import { ref, onMounted } from 'vue'
//当前页码
let pageNo = ref<number>(1)
//每一页展示的数据
let limit = ref<number>(3)
//存储已有品牌数据总数
let total = ref<number>(0)
//存储已有品牌的数据
let trademarkArr = ref<any>([])
//获取已有品牌的接口封装为一个函数:在任何情况下向获取数据,调用次函数即可
const getHasTrademark = async (pager = 1) => {
  //当前页码
  pageNo.value = pager
  try {
    let result = await reqHasTrademark(pageNo.value, limit.value)

    //存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
    console.log(trademarkArr)
  } catch (err) {
    ElMessage.error(err)
  }
}
//组件挂载完毕钩子---发一次请求,获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="scss" scoped></style>
