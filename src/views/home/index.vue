<template>
  <el-card>
    <div class="banner">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
        <p class="subtitle">{{ t('navBar.home') }}</p>
      </div>
    </div>
  </el-card>
  <div class="panel-box">
    <el-row :gutter="20">
      <el-col :sm="12" :lg="6">
        <el-card>
          <div class="small-panel user-reg suspension">
            <div class="small-panel-title">
              {{ t('panel.registration') }}
            </div>
            <div class="small-panel-content">
              <div class="content-left">
                <el-icon></el-icon>
                <el-icon color="#8595F4" size="20" name="fa fa-line-chart" />
                <span id="user_reg_number">5456</span>
              </div>
              <div class="content-right">+14%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-card>
          <div class="small-panel file suspension">
            <div class="small-panel-title">
              {{ t('panel.product') }}
            </div>
            <div class="small-panel-content">
              <div class="content-left">
                <el-icon color="#AD85F4" size="20" name="fa fa-file-text" />
                <span id="file_number">1234</span>
              </div>
              <div class="content-right">+50%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-card>
          <div class="small-panel users suspension">
            <div class="small-panel-title">
              {{ t('panel.visitors') }}
            </div>
            <div class="small-panel-content">
              <div class="content-left">
                <el-icon color="#74A8B5" size="20" name="fa fa-users" />
                <span id="users_number">9486</span>
              </div>
              <div class="content-right">+28%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="12" :lg="6">
        <el-card>
          <div class="small-panel addons suspension">
            <div class="small-panel-title">
              {{ t('panel.brand') }}
            </div>
            <div class="small-panel-content">
              <div class="content-left">
                <el-icon color="#F48595" size="20" name="fa fa-object-group" />
                <span id="addons_number">875</span>
              </div>
              <div class="content-right">+88%</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div class="rank">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12">
        <el-card :header="t('rank.saleRankings')">
          <div class="rank-content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                fixed
                prop="date"
                :label="t('table.date')"
                width="150"
              />
              <el-table-column
                prop="name"
                :label="t('table.name')"
                width="120"
              />
              <el-table-column
                prop="state"
                :label="t('table.province')"
                width="120"
              />
              <el-table-column
                prop="city"
                :label="t('table.city')"
                width="120"
              />
              <el-table-column
                prop="address"
                :label="t('table.address')"
                width="300"
              />

              <el-table-column
                fixed="right"
                :label="t('table.operation')"
                width="120"
              >
                <template #default>
                  <el-button link type="primary" size="small">
                    {{ t('table.detail') }}
                  </el-button>
                  <el-button link type="primary" size="small">
                    {{ t('table.edit') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :sm="24" :lg="12">
        <el-card :header="t('rank.saleRankings')">
          <div class="rank-content">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column
                fixed
                prop="date"
                :label="t('table.date')"
                width="150"
              />
              <el-table-column
                prop="name"
                :label="t('table.name')"
                width="120"
              />
              <el-table-column
                prop="state"
                :label="t('table.province')"
                width="120"
              />
              <el-table-column
                prop="city"
                :label="t('table.city')"
                width="120"
              />
              <el-table-column
                prop="address"
                :label="t('table.address')"
                width="300"
              />

              <el-table-column
                fixed="right"
                :label="t('table.operation')"
                width="120"
              >
                <template #default>
                  <el-button link type="primary" size="small">
                    {{ t('table.detail') }}
                  </el-button>
                  <el-button link type="primary" size="small">
                    {{ t('table.edit') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div class="bottoms">
    <svg-icon name="welcome" width="800px" height="400px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time'
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style lang="scss" scoped>
.banner {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}

.panel-box,
.rank {
  margin-top: 20px;
}
.small-panel {
  // background-color: #e9edf2;
  border-radius: var(--el-border-radius-base);
  // padding: 25px;
  margin-bottom: 20px;
  .small-panel-title {
    color: #92969a;
    font-size: 15px;
  }
  .small-panel-content {
    display: flex;
    align-items: flex-end;
    margin-top: 20px;
    color: #2c3f5d;
    .content-left {
      font-size: 24px;
      .icon {
        margin-right: 10px;
      }
      span {
        display: inline-block;
        font-size: 28px;
      }
    }
    .content-right {
      font-size: 18px;
      margin-left: auto;
    }
    .color-success {
      color: var(--el-color-success);
    }
    .color-warning {
      color: var(--el-color-warning);
    }
    .color-danger {
      color: var(--el-color-danger);
    }
    .color-info {
      color: var(--el-text-color-secondary);
    }
  }
}
.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.el-card {
  z-index: 99;
}
</style>
