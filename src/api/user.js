import request from '@/utils/request'
/**
 * 管理员登录
 */
export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

/**
 *  获取用户列表
 */

export function getUserList(query) {
  var url = '/user?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
  if (query.id) { // 用户id
    url += '&id=' + query.id
  }
  if (query.rank) { // 等级
    url += '&rank=' + query.rank
  }
  if (query.invitation) { // 邀请码（用户id）
    url += '&invitation=' + query.invitation
  }
  if (query.phone) { // 手机号
    url += '&phone=' + query.phone
  }
  if (query.status) { // 用户状态
    url += '&status=' + query.status
  }
  if (query.type) { // 用户类型
    url += '&type=' + query.type
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 通过id获取用户列表
export function getUserById(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

// 删除用户
export function delUser(unionid) {
  return request({
    url: '/user/' + unionid,
    method: 'delete'
  })
}
