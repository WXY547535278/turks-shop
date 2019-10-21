import request from '@/utils/request'

/**
 *  获取评价列表
 */

export function getEvaluateList(query) {
    var url = '/evaluate?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 评价id
        url += '&id=' + query.id
    }
    if (query.userId) { // 评价人(就是下单人)id
        url += '&userId=' + query.userId
    }
    if (query.orderId) { // 对应订单号
        url += '&orderId=' + query.orderId
    }
    if (query.type) { // 评价类型
        url += '&type=' + query.type
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 通过id获取评价详情
export function getEvaluateById(id) {
    return request({
        url: '/evaluate/' + id,
        method: 'get'
    })
}

// 删除评价
export function delEvaluate(unionid) {
    return request({
        url: '/evaluate/' + unionid,
        method: 'delete'
    })
}

// 修改评价
export function putEvaluate(data) {
    return request({
        url: '/evaluate',
        method: 'put',
        data
    })
}