import React, { createContext, useContext, useState, useEffect } from 'react'
import { notificationsAPI } from '../api'
import { useAuth } from './AuthContext'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user, isAuthenticated } = useAuth()

  // 获取用户通知
  const fetchNotifications = async () => {
    if (!isAuthenticated || !user?.id) return

    try {
      setLoading(true)
      const response = await notificationsAPI.getUserNotifications({
        populate: '*',
        sort: 'createdAt:desc',
        pagination: { limit: 50 }
      })
      setNotifications(response.data || [])
    } catch (err) {
      setError('获取通知失败')
      console.error('获取通知失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 获取未读数量
  const fetchUnreadCount = async () => {
    if (!isAuthenticated || !user?.id) return

    try {
      const response = await notificationsAPI.getUnreadCount()
      setUnreadCount(response.count || 0)
    } catch (err) {
      console.error('获取未读数量失败:', err)
    }
  }

  // 初始化通知
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchNotifications()
      fetchUnreadCount()
    }
  }, [isAuthenticated, user?.id])

  // 标记通知为已读
  const markAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markNotificationAsRead(notificationId)
      
      // 更新本地状态
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, attributes: { ...notification.attributes, isRead: true } }
            : notification
        )
      )
      
      // 更新未读数量
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error('标记已读失败:', err)
    }
  }

  // 标记所有通知为已读
  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllNotificationsAsRead()
      
      // 更新本地状态
      setNotifications(prev => 
        prev.map(notification => ({
          ...notification,
          attributes: { ...notification.attributes, isRead: true }
        }))
      )
      
      setUnreadCount(0)
    } catch (err) {
      console.error('标记全部已读失败:', err)
    }
  }

  // 删除通知
  const deleteNotification = async (notificationId) => {
    try {
      await notificationsAPI.deleteNotification(notificationId)
      
      // 更新本地状态
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
      
      // 如果删除的是未读通知，更新未读数量
      const deletedNotification = notifications.find(n => n.id === notificationId)
      if (deletedNotification && !deletedNotification.attributes.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (err) {
      console.error('删除通知失败:', err)
    }
  }

  // 添加新通知（用于实时通知）
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev])
    if (!notification.attributes.isRead) {
      setUnreadCount(prev => prev + 1)
    }
  }

  // 获取通知类型图标
  const getNotificationIcon = (type) => {
    const icons = {
      order: '📋',
      payment: '💳',
      guide: '👥',
      review: '⭐',
      system: '🔔',
      promotion: '🎉'
    }
    return icons[type] || '📢'
  }

  // 获取通知类型颜色
  const getNotificationColor = (type) => {
    const colors = {
      order: 'text-blue-600',
      payment: 'text-green-600',
      guide: 'text-purple-600',
      review: 'text-yellow-600',
      system: 'text-gray-600',
      promotion: 'text-red-600'
    }
    return colors[type] || 'text-gray-600'
  }

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    getNotificationIcon,
    getNotificationColor
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
