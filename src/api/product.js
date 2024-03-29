import request from '@/utils/request'

export function getProduct(id) {
    return request({
        url: '/product/' + id,
        method: 'get'
    })
}

/**
 * 获取产品列表
 * @param {obj} data 查询条件
 */
export function getProductList(query) {
    var url = '/product?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.status) { // 状态
        url += '&status=' + query.status
    }
    if (query.userId) { // 对应的用户id
        url += '&userId=' + query.userId
    }
    if (query.name) { // 产品名
        url += '&name=' + query.name
    }
    return request({
        url: url,
        method: 'get'
    })
}
// 获取产品规格详情
export function getSku(id) {
    return request({
        url: '/sku?productId=' + id,
        method: 'get'
    })
}
// 删除
export function deleteProduct(id) {
    return request({
        url: '/product/' + id,
        method: 'delete'
    })
}

// 修改
export function putProduct(data) {
    return request({
        url: '/product',
        method: 'put',
        data
    })
}