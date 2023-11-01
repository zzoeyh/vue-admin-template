<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuArr">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            :icon="scope.row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(scope.row)"
          ></el-button>
          <el-popconfirm
            :title="`你确定要删除${scope.row.skuName}?`"
            width="200px"
            @confirm="removeSku(scope.row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
    <!-- 抽屉组件:展示商品详情 -->
    <el-drawer v-model="drawer">
      <!-- 标题部分 -->
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
  <SkuForm
    :visible="skuFormVisible"
    :info="skuInfo"
    @change-visible="changeVisible"
    @change-info="changeSkuInfo"
  ></SkuForm>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
//引入请求
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
} from '@/api/product/sku'
//引入ts类型
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import SkuForm from './skuForm.vue'
//分页器当前页码
let pageNo = ref<number>(1)
//每一页展示几条数据
let pageSize = ref<number>(10)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
//控制抽屉显示与隐藏的字段
let drawer = ref<boolean>(false)
let skuInfo = ref<any>({})
let skuFormVisible = ref<boolean>(false)
//组件挂载完毕
onMounted(() => {
  getHasSku()
})
let data = ref({})
data.value = {
  records: [
    {
      id: 6470,
      createTime: '2023-10-31 13:58:18',
      updateTime: '2023-10-31 13:58:18',
      spuId: 6,
      price: 2,
      skuName: '1',
      skuDesc: '4',
      weight: '3.00',
      tmId: 6,
      category3Id: 61,
      skuDefaultImg:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      isSale: 0,
      skuImageList: null,
      skuAttrValueList: null,
      skuSaleAttrValueList: null,
    },
    {
      id: 6469,
      createTime: '2023-10-31 11:05:36',
      updateTime: '2023-10-31 13:54:20',
      spuId: 7004,
      price: 23,
      skuName: '测试',
      skuDesc: '测试',
      weight: '23.00',
      tmId: 6,
      category3Id: 61,
      skuDefaultImg:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      isSale: 0,
      skuImageList: null,
      skuAttrValueList: null,
      skuSaleAttrValueList: null,
    },
    {
      id: 6468,
      createTime: '2023-10-31 11:00:34',
      updateTime: '2023-10-31 11:00:33',
      spuId: 7004,
      price: 21,
      skuName: '测试2',
      skuDesc: '测试2',
      weight: '21.00',
      tmId: 6,
      category3Id: 61,
      skuDefaultImg:
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      isSale: 0,
      skuImageList: null,
      skuAttrValueList: null,
      skuSaleAttrValueList: null,
    },
  ],
  total: 3,
  size: 10,
  current: 1,
  orders: [],
  optimizeCountSql: true,
  hitCount: false,
  countId: null,
  maxLimit: null,
  searchCount: true,
  pages: 5,
}

const getHasSku = async () => {
  total.value = data.value.total
  skuArr.value = data.value.records
}

//分页器下拉菜单发生变化触发
const handler = (pageSizes: number) => {
  getHasSku()
}

const updateSale = async (row) => {
  const index = data.value.records.findIndex((record) => record.id === row.id)
  if (index !== -1) {
    const record = data.value.records[index]
    if (record.isSale === 1) {
      // 下架操作
      record.isSale = 0
      ElMessage({ type: 'success', message: '下架成功' })
    } else {
      // 上架操作
      record.isSale = 1
      ElMessage({ type: 'success', message: '上架成功' })
    }

    // 可以在此处进行相应的数据提交或保存操作
  }
}

const changeVisible = (val: boolean) => {
  skuFormVisible.value = val
}
const changeSkuInfo = (val) => {
  console.log(val)
}
//更新已有的SKU
const updateSku = async (row: SkuData) => {
  //存储已有的SKU
  skuInfo.value = row
  skuFormVisible.value = true
}
//查看商品详情按钮的回调
const findSku = async (row: SkuData) => {
  //抽屉展示出来
  drawer.value = true
  //获取已有商品详情数据
  // let result: SkuInfoData = await reqSkuInfo(row.id as number)
  //存储已有的SKU
  skuInfo.value = {
    id: 6470,
    createTime: '2023-10-31 13:58:18',
    updateTime: '2023-10-31 13:58:18',
    spuId: 6,
    price: 2,
    skuName: '1',
    skuDesc: '4',
    weight: '3.00',
    tmId: 6,
    category3Id: 61,
    skuDefaultImg:
      'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    isSale: 0,
    skuImageList: [
      {
        id: 366,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        skuId: 6470,
        imgName: '4b990e9437b1a445(3).jpg',
        imgUrl:
          'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        spuImgId: 33,
        isDefault: '0',
      },
      {
        id: 367,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        skuId: 6470,
        imgName: '4b990e9437b1a445(4).jpg',
        imgUrl:
          'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
        spuImgId: 34,
        isDefault: '0',
      },
    ],
    skuAttrValueList: [
      {
        id: 10981,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        attrId: 19100,
        valueId: 175754,
        skuId: 6470,
        attrName: '运行内存',
        valueName: '测试',
      },
      {
        id: 10982,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        attrId: 19162,
        valueId: 175896,
        skuId: 6470,
        attrName: '颜色',
        valueName: '汉堡',
      },
      {
        id: 10983,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        attrId: 19167,
        valueId: 175898,
        skuId: 6470,
        attrName: '颜色',
        valueName: '绿色',
      },
      {
        id: 10984,
        createTime: '2023-10-31 13:58:18',
        updateTime: '2023-10-31 13:58:18',
        attrId: 19180,
        valueId: 175915,
        skuId: 6470,
        attrName: '颜色',
        valueName: '测试',
      },
    ],
    skuSaleAttrValueList: [],
  }
}
//删除某一个已有的商品
const removeSku = async (id: number) => {
  //删除某一个已有商品的情况
  ElMessage({ type: 'success', message: '删除成功' })
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
