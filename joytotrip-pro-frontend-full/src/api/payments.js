import apiClient from './client'

// 支付 API
export const paymentsAPI = {
  // 创建 Stripe 支付会话
  async createStripeCheckoutSession(orderData) {
    return apiClient.post('/stripe/checkout', orderData)
  },

  // 获取支付状态
  async getPaymentStatus(orderId) {
    return apiClient.get(`/orders/${orderId}?populate=*`)
  },

  // 处理支付成功回调
  async handlePaymentSuccess(orderId) {
    return apiClient.put(`/orders/${orderId}`, {
      data: {
        paymentStatus: 'paid',
        status: 'paid'
      }
    })
  },

  // 处理支付失败
  async handlePaymentFailure(orderId) {
    return apiClient.put(`/orders/${orderId}`, {
      data: {
        paymentStatus: 'failed'
      }
    })
  },

  // 申请退款
  async requestRefund(orderId, reason) {
    return apiClient.post(`/orders/${orderId}/refund`, {
      reason
    })
  },

  // 获取支付历史
  async getPaymentHistory(userId) {
    return apiClient.get(`/orders?filters[user][id][$eq]=${userId}&filters[paymentStatus][$in][0]=paid&filters[paymentStatus][$in][1]=refunded&populate=*&sort=createdAt:desc`)
  }
}

export default paymentsAPI
