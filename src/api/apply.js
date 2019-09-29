import request from '@/utils/request'

export function getApply(id) {
  return request({
    url: '/apply/' + id,
    method: 'get'
  })
}

/**
 * 获取升级审核列表
 * @param {obj} data 查询条件
 */
export function getApplyList(query) {
  var url = '/apply?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.masterId) { // 审核人id
    url += '&masterId=' + query.masterId
  }
  if (query.leekId) { // 需要升级人id
    url += '&leekId=' + query.leekId
  }
  if (query.orderId) { // 对应订单id
    url += '&orderId=' + query.orderId
  }
  if (query.status) { // 投诉状态
    url += '&status=' + query.status
  }
  if (query.type) { // 审核类型
    url += '&type=' + query.type
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 新增
export function postApply(data) {
  return request({
    url: '/apply',
    method: 'post',
    data: data
  })
}
// 申诉投诉
export function putApply(id, status) {
  return request({
    url: '/apply/apply/' + id + '/' + status,
    method: 'put',
    data: {}
  })
}
// 删除
export function deleteApply(id) {
  return request({
    url: '/apply/' + id,
    method: 'delete'
  })
}
