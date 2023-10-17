import request from '@/utils/request'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
}

export const reqHasTrademark = (page: number, limit: number) => {
  request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)
}
