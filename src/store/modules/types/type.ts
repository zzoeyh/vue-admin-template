import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
  buttons: string[]
}

// user
// asnycRoute
/* export interface RouteVo {
  path: string
  component: () => Promise<typeof import('*.vue')>
  name: string
  meta: {
    title: string
    icon: string
  }
  redirect?: string
  children?: Array<RouteVo>
}
export interface AsnycRouteVo {
  [index: number]: RouteVo
}
 */
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c2Id: string | number
  c3Arr: CategoryObj[]
  c3Id: string | number
}
