import apiClient from './client'

// 订单 API
export const ordersAPI = {
  // 获取用户订单列表
  async getUserOrders(params = {}) {
    const queryParams = new URLSearchParams()
    
    if (params.populate) queryParams.append('populate', params.populate)
    if (params.filters) queryParams.append('filters', JSON.stringify(params.filters))
    if (params.sort) queryParams.append('sort', params.sort)
    if (params.pagination) queryParams.append('pagination', JSON.stringify(params.pagination))
    
    const queryString = queryParams.toString()
    const url = `/orders${queryString ? `?${queryString}` : ''}`
    
    return apiClient.get(url)
  },

  // 获取单个订单详情
  async getOrderById(id, populate = '*') {
    return apiClient.get(`/orders/${id}?populate=${populate}`)
  },

  // 创建新订单
  async createOrder(orderData) {
    return apiClient.post('/orders', {
      data: orderData
    })
  },

  // 更新订单状态
  async updateOrderStatus(id, status, additionalData = {}) {
    return apiClient.put(`/orders/${id}`, {
      data: {
        status,
        ...additionalData
      }
    })
  },

  // 取消订单
  async cancelOrder(id, reason) {
    return apiClient.put(`/orders/${id}`, {
      data: {
        status: 'cancelled',
        cancelReason: reason
      }
    })
  },

  // 添加订单评价
  async addOrderReview(id, review, rating) {
    return apiClient.put(`/orders/${id}`, {
      data: {
        review,
        rating
      }
    })
  },

  // 获取订单统计
  async getOrderStats() {
    return apiClient.get('/orders?populate=*')
  },

  // 按状态获取订单
  async getOrdersByStatus(status, limit = 20) {
    return apiClient.get(`/orders?filters[status][$eq]=${status}&pagination[limit]=${limit}&populate=*&sort=createdAt:desc`)
  }
}

export default ordersAPI
