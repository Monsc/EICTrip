import { apiClient } from './client'

// 获取导游列表
export const getGuides = async (params = {}) => {
  return apiClient.get('/guides', { params })
}

// 获取单个导游详情
export const getGuideById = async (id, params = {}) => {
  return apiClient.get(`/guides/${id}`, { params })
}

// 获取推荐导游
export const getRecommendedGuides = async (params = {}) => {
  return apiClient.get('/guides', { 
    params: { 
      ...params,
      filters: {
        ...params.filters,
        isRecommended: true
      }
    } 
  })
}

// 根据目的地获取导游
export const getGuidesByDestination = async (destinationId, params = {}) => {
  return apiClient.get('/guides', {
    params: {
      ...params,
      filters: {
        ...params.filters,
        destinations: destinationId
      }
    }
  })
}

// 根据语言获取导游
export const getGuidesByLanguage = async (language, params = {}) => {
  return apiClient.get('/guides', {
    params: {
      ...params,
      filters: {
        ...params.filters,
        languages: language
      }
    }
  })
}

// 搜索导游
export const searchGuides = async (query, params = {}) => {
  return apiClient.get('/guides', {
    params: {
      ...params,
      filters: {
        ...params.filters,
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
          { specialties: { $containsi: query } }
        ]
      }
    }
  })
}

// 获取导游评价
export const getGuideReviews = async (guideId, params = {}) => {
  return apiClient.get(`/guides/${guideId}/reviews`, { params })
}

// 添加导游评价
export const addGuideReview = async (guideId, reviewData) => {
  return apiClient.post(`/guides/${guideId}/reviews`, reviewData)
}

// 获取导游匹配推荐
export const getGuideMatches = async (orderData, params = {}) => {
  return apiClient.post('/guides/matches', orderData, { params })
}

// 预订导游
export const bookGuide = async (guideId, bookingData) => {
  return apiClient.post(`/guides/${guideId}/bookings`, bookingData)
}

// 获取导游可用时间
export const getGuideAvailability = async (guideId, dateRange) => {
  return apiClient.get(`/guides/${guideId}/availability`, {
    params: dateRange
  })
}

// 获取导游统计信息
export const getGuideStats = async (guideId) => {
  return apiClient.get(`/guides/${guideId}/stats`)
}

// 导游API对象
export const guidesAPI = {
  getGuides,
  getGuideById,
  getRecommendedGuides,
  getGuidesByDestination,
  getGuidesByLanguage,
  searchGuides,
  getGuideReviews,
  addGuideReview,
  getGuideMatches,
  bookGuide,
  getGuideAvailability,
  getGuideStats
}
