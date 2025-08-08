import apiClient from './client'

// 司导 API
export const guidesAPI = {
  // 获取所有司导
  async getGuides(params = {}) {
    const queryParams = new URLSearchParams()
    
    if (params.populate) queryParams.append('populate', params.populate)
    if (params.filters) queryParams.append('filters', JSON.stringify(params.filters))
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.pagination) queryParams.append('pagination', JSON.stringify(params.pagination))
    
    const queryString = queryParams.toString()
    const url = `/guides${queryString ? `?${queryString}` : ''}`
    
    return apiClient.get(url)
  },

  // 获取单个司导详情
  async getGuideById(id, populate = '*') {
    return apiClient.get(`/guides/${id}?populate=${populate}`)
  },

  // 获取推荐司导
  async getRecommendedGuides(limit = 6) {
    return apiClient.get(`/guides?pagination[limit]=${limit}&populate=*&sort=rating:desc`)
  },

  // 按目的地获取司导
  async getGuidesByDestination(destinationId, limit = 12) {
    return apiClient.get(`/guides?filters[destinations][id][$eq]=${destinationId}&pagination[limit]=${limit}&populate=*`)
  },

  // 按语言获取司导
  async getGuidesByLanguage(language, limit = 12) {
    return apiClient.get(`/guides?filters[languages][$contains]=${language}&pagination[limit]=${limit}&populate=*`)
  },

  // 搜索司导
  async searchGuides(searchTerm, limit = 12) {
    return apiClient.get(`/guides?filters[$or][0][name][$containsi]=${searchTerm}&filters[$or][1][specialty][$containsi]=${searchTerm}&pagination[limit]=${limit}&populate=*`)
  }
}

export default guidesAPI
