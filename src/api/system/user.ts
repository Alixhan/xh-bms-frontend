import createAxios from '@/utils/request'

const systemBaseUrl = import.meta.env.VITE_SYSTEM_BASE_URL

/**
 * 系统登录
 */
export function userLogin(params = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/login`, params)
}

/**
 * 系统注销
 */
export function userLogout(option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/logout`)
}

// 用户列表查询
export function queryUserList(params = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/query`, params)
}

// 切换用户字段值
export function postSwitchUserProp(params = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/switch_prop`, params)
}

// 保存系统用户
export function postSaveUser(params = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/save`, params)
}

// 获取用户详情
export function getUserById(id) {
  return createAxios().get(`${systemBaseUrl}/api/system/user/get/${id}`)
}

// 批量删除用户
export function delUserByIds(ids: string, option: RequestOption) {
  return createAxios(option).delete(`${systemBaseUrl}/api/system/user/del/${ids}`)
}

export interface  UserJobsParam {
  //数据类型 1：用户，2：用户组
  type: 1 | 2
  // 用户id或用户组id
  userId: number
  // 用户岗位信息
  userJobs?: any []
}

// 获取用户或者用户组的岗位信息
export function getUserJobs(params: UserJobsParam) {
  return createAxios().get(`${systemBaseUrl}/api/system/user/getUserJobs`, {params})
}

// 保存系统用户
export function saveUserJobs(params: UserJobsParam, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/saveUserJobs`, params)
}

// 用户组列表查询
export function queryUserGroupList(params: PageQuery = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/queryUserGroupList`, params)
}


// 用户组保存
export function saveUserGroup(params = {}, option?: RequestOption) {
  return createAxios(option).post(`${systemBaseUrl}/api/system/user/saveUserGroup`, params)
}

// id获取用户组详情
export function getUserGroupById(id) {
  return createAxios().get(`${systemBaseUrl}/api/system/user/getUserGroup/${id}`)
}

// ids批量删除用户组
export function delUserGroupByIds(ids: string, option: RequestOption) {
  return createAxios(option).delete(`${systemBaseUrl}/api/system/user/delUserGroup/${ids}`)
}

// 用户id获取用户所在的所有用户组信息
export function getUserGroups(id) {
  return createAxios().get(`${systemBaseUrl}/api/system/user/getUserGroups/${id}`)
}
