import request from '@/utils/request'

export function getGallery(id) {
    return request({
        url: '/gallery/' + id,
        method: 'get'
    })
}

/**
 * 获取轮播图列表
 * @param {obj} data 查询条件
 */
export function getGalleryList(query) {
    var url = '/gallery?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.typeId) {
        url += '&typeId=' + query.typeId
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postGallery(data) {
    return request({
        url: '/gallery',
        method: 'post',
        data: data
    })
}
// 修改
export function putGallery(data) {
    return request({
        url: '/gallery',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteGallery(id) {
    return request({
        url: '/gallery/' + id,
        method: 'delete'
    })
}