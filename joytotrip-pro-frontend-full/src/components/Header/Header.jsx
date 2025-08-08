import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaSignOutAlt, FaCog, FaBell } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const notificationDropdownRef = useRef(null)
  
  const { user, isAuthenticated, logout } = useAuth()
  const { unreadCount, notifications, markAsRead, markAllAsRead, deleteNotification, getNotificationIcon, getNotificationColor } = useNotifications()

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setIsUserDropdownOpen(false)
  }

  const handleNotificationClick = (notification) => {
    if (!notification.attributes.isRead) {
      markAsRead(notification.id)
    }
    setIsNotificationDropdownOpen(false)
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
    setIsNotificationDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EICTrip</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              首页
            </Link>
            <Link to="/routes" className="text-gray-700 hover:text-primary-600 transition-colors">
              旅游路线
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              关于我们
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              联系我们
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notification Bell */}
                <div className="relative" ref={notificationDropdownRef}>
                  <button
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                    className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaBell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">通知</h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={handleMarkAllAsRead}
                              className="text-sm text-primary-600 hover:text-primary-700"
                            >
                              全部标记为已读
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {notifications.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <FaBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p>暂无通知</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {notifications.slice(0, 10).map((notification) => (
                              <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                  notification.attributes.isRead 
                                    ? 'bg-gray-50 hover:bg-gray-100' 
                                    : 'bg-blue-50 hover:bg-blue-100'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  <span className="text-lg">
                                    {getNotificationIcon(notification.attributes.type)}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${
                                      notification.attributes.isRead ? 'text-gray-700' : 'text-gray-900'
                                    }`}>
                                      {notification.attributes.title}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {notification.attributes.content}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      {new Date(notification.attributes.createdAt).toLocaleString('zh-CN')}
                                    </p>
                                  </div>
                                  {!notification.attributes.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                      </span>
                    </div>
                    <span className="hidden sm:block">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user?.username || '用户'
                      }
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <FaCog className="w-4 h-4 mr-3" />
                          个人资料
                        </Link>
                        <Link
                          to="/my-orders"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          📋 我的订单
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <FaSignOutAlt className="w-4 h-4 mr-3" />
                          退出登录
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  注册
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link
                to="/routes"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                旅游路线
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                关于我们
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                联系我们
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/my-orders"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    我的订单
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    退出登录
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 