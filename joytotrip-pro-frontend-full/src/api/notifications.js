import { apiClient } from './client'

// 获取用户通知列表
export const getUserNotifications = async (params = {}) => {
  return apiClient.get('/notifications', { 
    params: {
      ...params,
      filters: {
        ...params.filters,
        user: localStorage.getItem('userId')
      }
    }
  })
}

// 获取单个通知详情
export const getNotificationById = async (id, params = {}) => {
  return apiClient.get(`/notifications/${id}`, { params })
}

// 标记通知为已读
export const markNotificationAsRead = async (id) => {
  return apiClient.put(`/notifications/${id}`, {
    data: { isRead: true }
  })
}

// 标记所有通知为已读
export const markAllNotificationsAsRead = async () => {
  return apiClient.put('/notifications/mark-all-read', {
    data: { userId: localStorage.getItem('userId') }
  })
}

// 删除通知
export const deleteNotification = async (id) => {
  return apiClient.delete(`/notifications/${id}`)
}

// 获取未读通知数量
export const getUnreadCount = async () => {
  return apiClient.get('/notifications/unread-count', {
    params: { userId: localStorage.getItem('userId') }
  })
}

// 创建通知
export const createNotification = async (notificationData) => {
  return apiClient.post('/notifications', notificationData)
}

// 获取通知设置
export const getNotificationSettings = async (userId) => {
  return apiClient.get(`/users/${userId}/notification-settings`)
}

// 更新通知设置
export const updateNotificationSettings = async (userId, settings) => {
  return apiClient.put(`/users/${userId}/notification-settings`, {
    data: settings
  })
}

// 通知API对象
export const notificationsAPI = {
  getUserNotifications,
  getNotificationById,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadCount,
  createNotification,
  getNotificationSettings,
  updateNotificationSettings
}
