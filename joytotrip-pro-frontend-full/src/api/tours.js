import apiClient from './client'

// 旅游产品 API
export const toursAPI = {
  // 获取旅游产品列表
  async getTours(params = {}) {
    const queryParams = new URLSearchParams()
    
    // 添加查询参数
    if (params.populate) queryParams.append('populate', params.populate)
    if (params.filters) queryParams.append('filters', JSON.stringify(params.filters))
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.pagination) queryParams.append('pagination', JSON.stringify(params.pagination))
    
    const queryString = queryParams.toString()
    const url = `/tours${queryString ? `?${queryString}` : ''}`
    
    return apiClient.get(url)
  },

  // 获取单个旅游产品详情
  async getTourById(id, populate = '*') {
    return apiClient.get(`/tours/${id}?populate=${populate}`)
  },

  // 获取热门旅游产品
  async getTrendingTours(limit = 6) {
    return apiClient.get(`/tours?filters[isTrending][$eq]=true&pagination[limit]=${limit}&populate=*`)
  },

  // 获取畅销旅游产品
  async getBestSellerTours(limit = 6) {
    return apiClient.get(`/tours?filters[isBestSeller][$eq]=true&pagination[limit]=${limit}&populate=*`)
  },

  // 按分类获取旅游产品
  async getToursByCategory(categoryId, limit = 12) {
    return apiClient.get(`/tours?filters[category][id][$eq]=${categoryId}&pagination[limit]=${limit}&populate=*`)
  },

  // 按目的地获取旅游产品
  async getToursByDestination(destinationId, limit = 12) {
    return apiClient.get(`/tours?filters[destination][id][$eq]=${destinationId}&pagination[limit]=${limit}&populate=*`)
  },

  // 搜索旅游产品
  async searchTours(searchTerm, limit = 12) {
    return apiClient.get(`/tours?filters[$or][0][title_zh][$containsi]=${searchTerm}&filters[$or][1][title_en][$containsi]=${searchTerm}&pagination[limit]=${limit}&populate=*`)
  }
}

export default toursAPI
