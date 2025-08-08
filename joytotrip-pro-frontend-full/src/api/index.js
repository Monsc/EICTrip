// API 统一导出
export { default as apiClient } from './client'
export { default as authAPI } from './auth'
export { default as toursAPI } from './tours'
export { default as destinationsAPI } from './destinations'
export { default as guidesAPI } from './guides'
export { default as ordersAPI } from './orders'
export { default as paymentsAPI } from './payments'

// 默认导出所有 API
export default {
  auth: authAPI,
  tours: toursAPI,
  destinations: destinationsAPI,
  guides: guidesAPI,
  orders: ordersAPI,
  payments: paymentsAPI
}
