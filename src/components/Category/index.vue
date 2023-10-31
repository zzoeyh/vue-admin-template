<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- change:选中值发生变化时触发 -->
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handleFirstCategoryChange"
        >
          <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="handleSecondCategoryChange"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
//引入组件挂载完毕方法
import { onMounted } from 'vue'
//引入分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
//分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
  // categoryStore.getC1()
  categoryStore.c1Arr = [
    {
      id: 1,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2022-05-07 11:42:44',
      name: '图书/音像/电子书刊',
    },
    {
      id: 2,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '手机',
    },
    {
      id: 3,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '家用电器',
    },
    {
      id: 4,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '数码',
    },
    {
      id: 5,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '家居家装',
    },
    {
      id: 6,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '电脑办公',
    },
    {
      id: 7,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '厨具',
    },
    {
      id: 8,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '个护化妆',
    },
    {
      id: 9,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '服饰内衣',
    },
    {
      id: 10,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '钟表',
    },
    {
      id: 11,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '鞋靴',
    },
    {
      id: 12,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '母婴',
    },
    {
      id: 13,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '礼品箱包',
    },
    {
      id: 14,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2022-05-07 11:42:49',
      name: '食品饮料/保健食品',
    },
    {
      id: 15,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '珠宝',
    },
    {
      id: 16,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '汽车用品',
    },
    {
      id: 17,
      createTime: '2021-12-10 01:31:41',
      updateTime: '2021-12-10 01:31:41',
      name: '运动健康',
    },
  ]
})

//此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const handleFirstCategoryChange = () => {
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  if (categoryStore.c1Id === 1) {
    categoryStore.c2Arr = [
      {
        id: 1,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '电子书刊',
        category1Id: 1,
      },
      {
        id: 2,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '音像',
        category1Id: 1,
      },
      {
        id: 3,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '英文原版',
        category1Id: 1,
      },
      {
        id: 4,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '文艺',
        category1Id: 1,
      },
      {
        id: 5,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '少儿',
        category1Id: 1,
      },
      {
        id: 6,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '人文社科',
        category1Id: 1,
      },
      {
        id: 7,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '经管励志',
        category1Id: 1,
      },
      {
        id: 8,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '生活',
        category1Id: 1,
      },
      {
        id: 9,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '科技',
        category1Id: 1,
      },
      {
        id: 10,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '教育',
        category1Id: 1,
      },
      {
        id: 11,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '港台图书',
        category1Id: 1,
      },
      {
        id: 12,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '其他',
        category1Id: 1,
      },
    ]
  }
  // categoryStore.getC2()
}
//选中二级时再发送获取三级请求
const handleSecondCategoryChange = () => {
  categoryStore.c3Id = ''
  // categoryStore.getC3()
  categoryStore.c3Arr = []
  console.log(categoryStore.c2Id)
  if (categoryStore.c2Id === 1) {
    categoryStore.c3Arr = [
      {
        id: 1,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '电子书',
        category2Id: 1,
      },
      {
        id: 2,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '网络原创',
        category2Id: 1,
      },
      {
        id: 3,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '数字杂志',
        category2Id: 1,
      },
      {
        id: 4,
        createTime: '2021-12-10 01:31:41',
        updateTime: '2021-12-10 01:31:41',
        name: '多媒体图书',
        category2Id: 1,
      },
    ]
  }
}

//接受父组件传递过来scene
defineProps(['scene'])
</script>

<style scoped></style>
