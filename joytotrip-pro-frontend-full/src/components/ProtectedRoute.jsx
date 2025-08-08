import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

function ProtectedRoute({ children, requireAuth = true, roles = [] }) {
  const { user, loading, isAuthenticated } = useAuth()
  const location = useLocation()

  // 显示加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="正在验证身份..." />
      </div>
    )
  }

  // 如果需要认证但用户未登录
  if (requireAuth && !isAuthenticated) {
    // 保存当前路径，登录后重定向回来
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 如果不需要认证但用户已登录，重定向到首页
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // 如果需要特定角色权限
  if (roles.length > 0 && user) {
    const userRole = user.role?.name || user.role
    if (!roles.includes(userRole)) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              访问被拒绝
            </h1>
            <p className="text-gray-600 mb-6">
              您没有权限访问此页面
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              返回上一页
            </button>
          </div>
        </div>
      )
    }
  }

  return children
}

export default ProtectedRoute
