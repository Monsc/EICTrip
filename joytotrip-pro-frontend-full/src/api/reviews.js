import { apiClient } from './client'

// 获取评价列表
export const getReviews = async (params = {}) => {
  return apiClient.get('/reviews', { params })
}

// 获取单个评价详情
export const getReviewById = async (id, params = {}) => {
  return apiClient.get(`/reviews/${id}`, { params })
}

// 添加评价
export const addReview = async (reviewData) => {
  return apiClient.post('/reviews', reviewData)
}

// 更新评价
export const updateReview = async (id, reviewData) => {
  return apiClient.put(`/reviews/${id}`, reviewData)
}

// 删除评价
export const deleteReview = async (id) => {
  return apiClient.delete(`/reviews/${id}`)
}

// 获取旅游产品评价
export const getTourReviews = async (tourId, params = {}) => {
  return apiClient.get(`/tours/${tourId}/reviews`, { params })
}

// 为旅游产品添加评价
export const addTourReview = async (tourId, reviewData) => {
  return apiClient.post(`/tours/${tourId}/reviews`, reviewData)
}

// 获取用户评价
export const getUserReviews = async (userId, params = {}) => {
  return apiClient.get(`/users/${userId}/reviews`, { params })
}

// 获取评价统计
export const getReviewStats = async (entityType, entityId) => {
  return apiClient.get(`/reviews/stats`, {
    params: { entityType, entityId }
  })
}

// 评价API对象
export const reviewsAPI = {
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  getTourReviews,
  addTourReview,
  getUserReviews,
  getReviewStats
}
