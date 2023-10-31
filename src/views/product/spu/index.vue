<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          @click="addSpu"
          type="primary"
          size="default"
          icon="Plus"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0px" border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(scope.row)"
              ></el-button>
              <el-button
                type="primary"
                size="small"
                icon="View"
                title="查看SKU列表"
                @click="findSku(scope.row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${scope.row.spuName}?`"
                width="200px"
                @confirm="deleteSpu(scope.row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <SpuForm
        ref="spu"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <SkuForm
        ref="sku"
        v-show="scene == 2"
        @changeScene="changeScene"
      ></SkuForm>
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="scope">
              <img
                :src="scope.row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  HasSpuResponseData,
  Records,
  SkuInfoData,
  SkuData,
} from '@/api/product/spu/type'
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
//引入分类的仓库
import useCategoryStore from '@/store/modules/category'
import type { SpuData } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category/index.vue'
let categoryStore = useCategoryStore()
//场景的数据
let scene = ref<number>(0) //0:显示已有SPU  1:添加或者修改已有SPU 2:添加SKU的结构
//分页器默认页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(3)
//存储已有的SPU的数据
let records = ref<Records>([])
//存储已有SPU总个数
let total = ref<number>(0)
//获取子组件实例SpuForm
let spu = ref<any>()
//获取子组件实例SkuForm
let sku = ref<any>()
//存储全部的SKU数据
let skuArr = ref<SkuData[]>([])
let show = ref<boolean>(false)
//监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    //当三级分类发生变化的时候清空对应的数据
    records.value = []
    //务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)

//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async () => {
  //修改当前页码
  /*   pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
    console.log('3', records.value)
  } */
  if (categoryStore.c3Id === 1) {
    records.value = [
      {
        id: 7025,
        createTime: '2023-10-31 20:55:50',
        updateTime: '2023-10-31 20:55:50',
        spuName: '1',
        description: '1',
        category3Id: 1,
        tmId: 2,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
      {
        id: 7010,
        createTime: '2023-10-31 17:04:36',
        updateTime: '2023-10-31 17:04:36',
        spuName: '测试',
        description: '测试123',
        category3Id: 1,
        tmId: 2,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
      {
        id: 6933,
        createTime: '2023-10-25 16:46:15',
        updateTime: '2023-10-25 16:46:15',
        spuName: 'fsdfsd',
        description: 'fdsfsd123',
        category3Id: 1,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
    ]
  } else if (categoryStore.c3Id === 2) {
    records.value = [
      {
        id: 6858,
        createTime: '2023-10-03 00:38:44',
        updateTime: '2023-10-03 00:38:44',
        spuName: '勾巴原创22',
        description: '乱填的333',
        category3Id: 2,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
      {
        id: 6489,
        createTime: '2023-09-05 14:38:17',
        updateTime: '2023-09-05 14:38:17',
        spuName: '1·2',
        description: '',
        category3Id: 2,
        tmId: null,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
      {
        id: 6297,
        createTime: '2023-10-03 00:38:44',
        updateTime: '2023-10-03 00:38:44',
        spuName: '勾巴原创',
        description: '乱填的333',
        category3Id: 2,
        tmId: 1,
        spuSaleAttrList: null,
        spuImageList: null,
        spuPosterList: null,
      },
    ]
  }
  total.value = records.value.length
}

const changeSize = () => {
  getHasSpu()
}

const addSpu = () => {
  //切换到spuForm
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  //调用子组件实例方法获取完整已有的SPU的数据
  spu.value.initHasSpuData(row)
}

const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value)
  } else {
    //添加留在第一页
    getHasSpu()
  }
}

//添加SKU按钮的回调
const addSku = (row: SpuData) => {
  //点击添加SKU按钮切换场景为2
  scene.value = 2
  //调用子组件的方法初始化添加SKU的数据
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

//查看SKU列表的数据
const findSku = async (row: SpuData) => {
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    //对话框显示出来
    show.value = true
  }
}

//删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //获取剩余SPU数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

//路由组件销毁前，情况仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped></style>
