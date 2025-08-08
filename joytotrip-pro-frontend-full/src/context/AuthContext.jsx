import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api'

// 创建认证上下文
const AuthContext = createContext()

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 初始化时检查用户登录状态
  useEffect(() => {
    initializeAuth()
  }, [])

  // 初始化认证状态
  const initializeAuth = async () => {
    try {
      setLoading(true)
      
      // 检查本地是否有令牌
      if (authAPI.isAuthenticated()) {
        // 获取当前用户信息
        const userData = await authAPI.getCurrentUser()
        setUser(userData)
        authAPI.storeUser(userData)
      }
    } catch (error) {
      console.error('认证初始化失败:', error)
      // 清除无效的令牌
      authAPI.logout()
    } finally {
      setLoading(false)
    }
  }

  // 用户登录
  const login = async (identifier, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await authAPI.login(identifier, password)
      
      // 存储令牌和用户信息
      localStorage.setItem('authToken', response.jwt)
      setUser(response.user)
      authAPI.storeUser(response.user)
      
      return response
    } catch (error) {
      setError(error.message || '登录失败')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // 用户注册
  const register = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await authAPI.register(userData)
      
      // 注册成功后自动登录
      localStorage.setItem('authToken', response.jwt)
      setUser(response.user)
      authAPI.storeUser(response.user)
      
      return response
    } catch (error) {
      setError(error.message || '注册失败')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // 用户登出
  const logout = () => {
    authAPI.logout()
    setUser(null)
    setError(null)
  }

  // 更新用户信息
  const updateProfile = async (userData) => {
    try {
      setLoading(true)
      setError(null)
      
      const updatedUser = await authAPI.updateProfile(userData)
      setUser(updatedUser)
      authAPI.storeUser(updatedUser)
      
      return updatedUser
    } catch (error) {
      setError(error.message || '更新失败')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // 清除错误
  const clearError = () => {
    setError(null)
  }

  // 上下文值
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 使用认证上下文的 Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
