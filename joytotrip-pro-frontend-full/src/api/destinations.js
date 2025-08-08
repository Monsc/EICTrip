import apiClient from './client'

// 目的地 API
export const destinationsAPI = {
  // 获取所有目的地
  async getDestinations(params = {}) {
    const queryParams = new URLSearchParams()
    
    if (params.populate) queryParams.append('populate', params.populate)
    if (params.filters) queryParams.append('filters', JSON.stringify(params.filters))
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.pagination) queryParams.append('pagination', JSON.stringify(params.pagination))
    
    const queryString = queryParams.toString()
    const url = `/destinations${queryString ? `?${queryString}` : ''}`
    
    return apiClient.get(url)
  },

  // 获取单个目的地详情
  async getDestinationById(id, populate = '*') {
    return apiClient.get(`/destinations/${id}?populate=${populate}`)
  },

  // 获取热门目的地
  async getTopDestinations(limit = 8) {
    return apiClient.get(`/destinations?pagination[limit]=${limit}&populate=*&sort=createdAt:desc`)
  },

  // 按地区获取目的地
  async getDestinationsByRegion(region, limit = 12) {
    return apiClient.get(`/destinations?filters[region][$eq]=${region}&pagination[limit]=${limit}&populate=*`)
  }
}

export default destinationsAPI
