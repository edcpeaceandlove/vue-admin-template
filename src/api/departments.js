import request from '@/utils/request'

//获取组织架构的数据
export function getDepartments() {
  return request({
    url: '/company/department',
  })
}

// 删除组织架构的部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}

// 新增组织架构的部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据id获取某个部门的详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 编辑组织架构的部门
export function updateDepartments(data) {
  return request({
    method: 'put',
    url: `/company/department/${data.id}`,
    data
  })
}