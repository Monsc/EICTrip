import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEye, FaCreditCard, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { ordersAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('all')
  
  const { user } = useAuth()

  // 获取用户订单
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await ordersAPI.getUserOrders({
          populate: '*',
          filters: {
            user: user?.id
          },
          sort: 'createdAt:desc'
        })
        setOrders(response.data || [])
      } catch (err) {
        setError('获取订单失败')
        console.error('获取订单失败:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchOrders()
    }
  }, [user?.id])

  // 过滤订单
  const filteredOrders = orders.filter(order => {
    const status = order.attributes.status
    if (activeTab === 'all') return true
    if (activeTab === 'pending') return status === 'pending'
    if (activeTab === 'paid') return status === 'paid'
    if (activeTab === 'completed') return status === 'completed'
    if (activeTab === 'cancelled') return status === 'cancelled'
    return true
  })

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { text: '待支付', class: 'bg-yellow-100 text-yellow-800' },
      paid: { text: '已支付', class: 'bg-green-100 text-green-800' },
      completed: { text: '已完成', class: 'bg-blue-100 text-blue-800' },
      cancelled: { text: '已取消', class: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status] || { text: status, class: 'bg-gray-100 text-gray-800' }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.text}
      </span>
    )
  }

  // 如果正在加载
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="正在加载订单..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">我的订单</h1>
          <p className="text-gray-600">查看您的旅游订单和预订记录</p>
        </div>

        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* 标签页 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: '全部', count: orders.length },
              { key: 'pending', label: '待支付', count: orders.filter(o => o.attributes.status === 'pending').length },
              { key: 'paid', label: '已支付', count: orders.filter(o => o.attributes.status === 'paid').length },
              { key: 'completed', label: '已完成', count: orders.filter(o => o.attributes.status === 'completed').length },
              { key: 'cancelled', label: '已取消', count: orders.filter(o => o.attributes.status === 'cancelled').length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* 订单列表 */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无订单</h3>
            <p className="text-gray-600 mb-6">您还没有任何订单记录</p>
            <Link
              to="/"
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              开始预订
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* 订单头部 */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {order.attributes.tour?.data?.attributes?.title_zh || 
                         order.attributes.tour?.data?.attributes?.title_en || 
                         '旅游产品'}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {new Date(order.attributes.travelDate || order.attributes.createdAt).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {order.attributes.tour?.data?.attributes?.destination?.data?.attributes?.name || '目的地'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.attributes.status)}
                      <div className="text-2xl font-bold text-primary-600 mt-2">
                        ¥{order.attributes.totalAmount || order.attributes.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 订单详情 */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">订单号</span>
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">人数</span>
                      <p className="font-medium">{order.attributes.quantity || 1} 人</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">创建时间</span>
                      <p className="font-medium">
                        {new Date(order.attributes.createdAt).toLocaleString('zh-CN')}
                      </p>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <FaEye className="mr-2" />
                      查看详情
                    </Link>
                    
                    {order.attributes.status === 'pending' && (
                      <Link
                        to={`/payment/${order.id}`}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaCreditCard className="mr-2" />
                        立即支付
                      </Link>
                    )}
                    
                    {order.attributes.status === 'completed' && !order.attributes.review && (
                      <button className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                        <FaStar className="mr-2" />
                        评价订单
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders 