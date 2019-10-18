import request from '@/utils/request'

/**
 *  获取短信列表
 */

export function getMessageList(query) {
    var url = '/sms?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.id) { // 用户id
        url += '&id=' + query.id
    }
    if (query.status) { // 等级
        url += '&status=' + query.status
    }
    if (query.userId) { // 邀请码（用户id）
        url += '&userId=' + query.userId
    }
    if (query.userPhone) { // 手机号
        url += '&userPhone=' + query.userPhone
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 通过id获取短信详情
export function getMessageById(id) {
    return request({
        url: '/sms/' + id,
        method: 'get'
    })
}

// 删除短信
export function delMessage(unionid) {
    return request({
        url: '/sms/' + unionid,
        method: 'delete'
    })
}

// 发送短信
export function SendMessage(data, param) {
    return request({
        url: '/sms/batch?' + param,
        method: 'post',
        data
    })
}