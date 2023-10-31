<template>
  <el-table
    :data="permissionArr"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <!-- row:即为已有的菜单对象|按钮的对象的数据 -->
      <template #default="scope">
        <el-button
          type="primary"
          @click="addPermisstion(scope.row)"
          size="small"
          :disabled="scope.row.level == 4 ? true : false"
        >
          {{ scope.row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="primary"
          @click="updatePermisstion(scope.row)"
          size="small"
          :disabled="scope.row.level == 1 ? true : false"
        >
          编辑
        </el-button>
        <el-popconfirm
          :title="`你确定要删除${scope.row.name}?`"
          width="260px"
          @confirm="removeMenu(scope.row.id)"
        >
          <template #reference>
            <el-button
              type="primary"
              size="small"
              :disabled="scope.row.level == 1 ? true : false"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- 对话框组件:添加或者更新已有的菜单的数据结构 -->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新菜单' : '添加菜单'"
  >
    <!-- 表单组件:收集新增与已有的菜单的数据 -->
    <el-form>
      <el-form-item label="名称">
        <el-input
          placeholder="请你输入菜单名称"
          v-model="menuData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限">
        <el-input
          placeholder="请你输入权限数值"
          v-model="menuData.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
//引入获取菜单请求API
import {
  reqAllPermisstion,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from '@/api/manage/menu'
//引入ts类型
import type {
  MenuParams,
  PermisstionResponseData,
  PermisstionList,
  Permisstion,
} from '@/api/manage/menu/type'
import { ElMessage } from 'element-plus'
//存储菜单的数据
let permissionArr = ref<PermisstionList>([])
//控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//携带的参数
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
//组件挂载完毕
onMounted(() => {
  getHasPermisstion()
})
//获取菜单数据的方法
const getHasPermisstion = async () => {
  let result: PermisstionResponseData = await reqAllPermisstion()
  if (result.code == 200) {
    permissionArr.value = result.data
  }
}
/* const getHasPermisstion = async () => {
  permissionArr.value = [
    {
      id: 1,
      createTime: '2019-11-15 17:13:06',
      updateTime: '2020-09-25 13:47:54',
      pid: 0,
      name: '全部数据',
      code: null,
      toCode: null,
      type: 1,
      status: null,
      level: 1,
      children: [
        {
          id: 7,
          createTime: '2020-11-30 16:40:08',
          updateTime: '2021-12-04 19:39:41',
          pid: 1,
          name: '权限管理',
          code: 'Acl',
          toCode: '',
          type: 1,
          status: null,
          level: 2,
          children: [
            {
              id: 8,
              createTime: '2020-11-30 16:40:38',
              updateTime: '2021-12-04 19:40:01',
              pid: 7,
              name: '用户管理',
              code: 'User',
              toCode: '',
              type: 1,
              status: null,
              level: 3,
              children: [
                {
                  id: 11,
                  createTime: '2020-11-30 16:43:16',
                  updateTime: '2021-12-04 19:42:37',
                  pid: 8,
                  name: '添加用户',
                  code: 'btn.User.add',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 12,
                  createTime: '2020-11-30 16:45:00',
                  updateTime: '2021-12-04 19:42:39',
                  pid: 8,
                  name: '删除用户',
                  code: 'btn.User.remove',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 13,
                  createTime: '2020-11-30 16:45:32',
                  updateTime: '2021-12-04 19:42:41',
                  pid: 8,
                  name: '修改用户',
                  code: 'btn.User.update',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 14,
                  createTime: '2020-11-30 16:46:08',
                  updateTime: '2021-12-04 19:42:43',
                  pid: 8,
                  name: '分配角色',
                  code: 'btn.User.assgin',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 6781,
                  createTime: '2023-10-29 16:54:17',
                  updateTime: '2023-10-29 16:54:17',
                  pid: 8,
                  name: '其他',
                  code: 'btn.User.other',
                  toCode: null,
                  type: 0,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
              ],
              select: false,
            },
            {
              id: 9,
              createTime: '2020-11-30 16:40:55',
              updateTime: '2021-12-04 19:40:02',
              pid: 7,
              name: '角色管理',
              code: 'Role',
              toCode: '',
              type: 1,
              status: null,
              level: 3,
              children: [
                {
                  id: 15,
                  createTime: '2020-11-30 16:50:13',
                  updateTime: '2021-12-04 19:42:45',
                  pid: 9,
                  name: '分配权限',
                  code: 'btn.Role.assgin',
                  toCode: 'RoleAuth',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 16,
                  createTime: '2020-11-30 16:50:56',
                  updateTime: '2021-12-04 19:42:48',
                  pid: 9,
                  name: '添加角色',
                  code: 'btn.Role.add',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 17,
                  createTime: '2020-11-30 16:51:22',
                  updateTime: '2021-12-04 19:42:50',
                  pid: 9,
                  name: '修改角色',
                  code: 'btn.Role.update',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 18,
                  createTime: '2020-11-30 16:52:34',
                  updateTime: '2021-12-04 19:42:53',
                  pid: 9,
                  name: '删除角色',
                  code: 'btn.Role.remove',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
              ],
              select: false,
            },
            {
              id: 10,
              createTime: '2020-11-30 16:41:21',
              updateTime: '2021-12-04 19:40:06',
              pid: 7,
              name: '菜单管理',
              code: 'Permission',
              toCode: '',
              type: 1,
              status: null,
              level: 3,
              children: [
                {
                  id: 19,
                  createTime: '2020-11-30 16:56:23',
                  updateTime: '2021-12-04 19:42:55',
                  pid: 10,
                  name: '添加',
                  code: 'btn.Permission.add',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 20,
                  createTime: '2020-11-30 16:59:02',
                  updateTime: '2021-12-04 19:42:58',
                  pid: 10,
                  name: '修改',
                  code: 'btn.Permission.update',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 21,
                  createTime: '2020-11-30 16:59:27',
                  updateTime: '2021-12-04 19:43:00',
                  pid: 10,
                  name: '删除',
                  code: 'btn.Permission.remove',
                  toCode: '',
                  type: 2,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 6314,
                  createTime: '2023-10-13 17:17:05',
                  updateTime: '2023-10-21 15:44:57',
                  pid: 10,
                  name: '隐藏',
                  code: 'btn.Permission.hidden',
                  toCode: null,
                  type: 0,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
              ],
              select: false,
            },
            {
              id: 6801,
              createTime: '2023-10-30 16:03:53',
              updateTime: '2023-10-30 16:03:53',
              pid: 7,
              name: '部门管理',
              code: 'Dept',
              toCode: null,
              type: 1,
              status: null,
              level: 3,
              children: [
                {
                  id: 6802,
                  createTime: '2023-10-30 16:06:54',
                  updateTime: '2023-10-30 16:06:54',
                  pid: 6801,
                  name: '新增',
                  code: '',
                  toCode: null,
                  type: 1,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 6803,
                  createTime: '2023-10-30 16:07:06',
                  updateTime: '2023-10-30 16:07:06',
                  pid: 6801,
                  name: '修改',
                  code: '',
                  toCode: null,
                  type: 1,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
                {
                  id: 6804,
                  createTime: '2023-10-30 16:07:12',
                  updateTime: '2023-10-30 16:07:12',
                  pid: 6801,
                  name: '删除',
                  code: '',
                  toCode: null,
                  type: 1,
                  status: null,
                  level: 4,
                  children: [],
                  select: false,
                },
              ],
              select: false,
            },
            {
              id: 6806,
              createTime: '2023-10-31 07:45:14',
              updateTime: '2023-10-31 07:45:14',
              pid: 7,
              name: '给对方梵蒂冈',
              code: '给对方广泛的 ',
              toCode: null,
              type: 0,
              status: null,
              level: 3,
              children: [],
              select: false,
            },
          ],
          select: false,
        },
      ],
    },
  ]
} */
//添加菜单按钮的回调
const addPermisstion = (row: Permisstion) => {
  //清空数据
  Object.assign(menuData, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id as number
}

const updatePermisstion = (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuData, row)
}

//确定按钮的回调
const save = async () => {
  //发请求:新增子菜单|更新某一个已有的菜单的数据
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code == 200) {
    //对话框隐藏
    dialogVisible.value = false
    //提示信息
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    //再次获取全部最新的菜单的数据
    getHasPermisstion()
  }
}

//删除按钮回调
const removeMenu = async (id: number) => {
  let result = await reqRemoveMenu(id)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasPermisstion()
  }
}
</script>

<style scoped></style>
