import axios from 'axios'

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器 - 添加认证令牌
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一错误处理
apiClient.interceptors.response.use(
  (response) => {
    // Strapi 返回的数据在 data 属性中
    return response.data
  },
  (error) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 未授权，清除本地令牌
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    
    // 返回错误信息
    const errorMessage = error.response?.data?.error?.message || 
                        error.response?.data?.message || 
                        error.message || 
                        '网络错误，请稍后重试'
    
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    })
  }
)

// 同时支持默认导出和命名导出
export { apiClient }
export default apiClient
