import apiClient from './client'

// 认证 API
export const authAPI = {
  // 用户注册
  async register(userData) {
    return apiClient.post('/auth/local/register', userData)
  },

  // 用户登录
  async login(identifier, password) {
    return apiClient.post('/auth/local', {
      identifier, // 可以是邮箱或用户名
      password
    })
  },

  // 获取当前用户信息
  async getCurrentUser() {
    return apiClient.get('/users/me')
  },

  // 更新用户信息
  async updateProfile(userData) {
    return apiClient.put('/users/me', userData)
  },

  // 修改密码
  async changePassword(currentPassword, newPassword) {
    return apiClient.put('/users/me', {
      currentPassword,
      password: newPassword
    })
  },

  // 忘记密码
  async forgotPassword(email) {
    return apiClient.post('/auth/forgot-password', { email })
  },

  // 重置密码
  async resetPassword(code, password, passwordConfirmation) {
    return apiClient.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation
    })
  },

  // 验证邮箱
  async verifyEmail(code) {
    return apiClient.post('/auth/email-confirmation', { code })
  },

  // 重新发送验证邮件
  async resendVerificationEmail(email) {
    return apiClient.post('/auth/send-email-confirmation', { email })
  },

  // 登出 (清除本地令牌)
  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // 检查是否已登录
  isAuthenticated() {
    return !!localStorage.getItem('authToken')
  },

  // 获取存储的用户信息
  getStoredUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // 存储用户信息
  storeUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export default authAPI
