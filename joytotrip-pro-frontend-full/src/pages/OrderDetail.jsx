import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCreditCard, FaStar, FaUser } from 'react-icons/fa'
import { ordersAPI, toursAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import GuideMatching from '../components/GuideMatching/GuideMatching'
import ReviewForm from '../components/Reviews/ReviewForm'
import ReviewList from '../components/Reviews/ReviewList'

function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [order, setOrder] = useState(null)
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showGuideMatching, setShowGuideMatching] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState(null)

  // 获取订单详情
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true)
        
        // 获取订单详情
        const orderResponse = await ordersAPI.getOrderById(id, {
          populate: '*'
        })
        const orderData = orderResponse.data
        
        // 获取旅游产品详情
        if (orderData.attributes.tour?.data?.id) {
          const tourResponse = await toursAPI.getTourById(orderData.attributes.tour.data.id, {
            populate: '*'
          })
          setTour(tourResponse.data)
        }
        
        setOrder(orderData)
      } catch (err) {
        setError('获取订单信息失败')
        console.error('获取订单信息失败:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrderData()
    }
  }, [id])

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
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.class}`}>
        {config.text}
      </span>
    )
  }

  // 处理导游选择
  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide)
    setShowGuideMatching(false)
    // 这里可以调用API更新订单的导游信息
  }

  // 处理评价提交
  const handleReviewSubmit = () => {
    setShowReviewForm(false)
    // 刷新评价列表
    window.location.reload()
  }

  // 如果正在加载
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="正在加载订单详情..." />
      </div>
    )
  }

  // 如果有错误
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">加载失败</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回上一页
          </button>
        </div>
      </div>
    )
  }

  // 如果订单不存在
  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">订单不存在</h1>
          <p className="text-gray-600 mb-6">您要查看的订单不存在或已被删除</p>
          <button
            onClick={() => navigate('/my-orders')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回我的订单
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 返回按钮 */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            返回
          </button>
        </div>

        {/* 订单详情 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要信息 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 订单状态卡片 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">订单详情</h1>
                {getStatusBadge(order.attributes.status)}
              </div>

              {/* 旅游产品信息 */}
              {tour && (
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={tour.attributes.image?.data?.attributes?.url || 'https://via.placeholder.com/120x80'}
                      alt={tour.attributes.title_zh || tour.attributes.title_en}
                      className="w-30 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tour.attributes.title_zh || tour.attributes.title_en}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tour.attributes.destination?.data?.attributes?.name || '目的地'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 订单信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">订单号</span>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">创建时间</span>
                  <p className="font-medium">
                    {new Date(order.attributes.createdAt).toLocaleString('zh-CN')}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">旅行日期</span>
                  <p className="font-medium">
                    {order.attributes.travelDate 
                      ? new Date(order.attributes.travelDate).toLocaleDateString('zh-CN')
                      : '待确认'
                    }
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">人数</span>
                  <p className="font-medium">{order.attributes.quantity || 1} 人</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">单价</span>
                  <p className="font-medium">¥{order.attributes.price || tour?.attributes?.price}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">总计</span>
                  <p className="font-medium text-lg text-primary-600">
                    ¥{order.attributes.totalAmount || order.attributes.price}
                  </p>
                </div>
              </div>
            </div>

            {/* 导游匹配 */}
            {order.attributes.status === 'paid' && !selectedGuide && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">导游匹配</h2>
                  <button
                    onClick={() => setShowGuideMatching(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    选择导游
                  </button>
                </div>
                <p className="text-gray-600">
                  您的订单已支付成功，现在可以为您的旅行选择专业导游
                </p>
              </div>
            )}

            {/* 已选择导游 */}
            {selectedGuide && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">已选择导游</h2>
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedGuide.attributes.avatar?.data?.attributes?.url || 'https://via.placeholder.com/80x80'}
                    alt={selectedGuide.attributes.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedGuide.attributes.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      语言: {selectedGuide.attributes.languages?.join(', ') || '中文'}
                    </p>
                    <p className="text-sm text-gray-600">
                      经验: {selectedGuide.attributes.experience || 0}年
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 评价 */}
            {order.attributes.status === 'completed' && (
              <ReviewList
                entityType="tour"
                entityId={tour?.id}
                showAddButton={!order.attributes.review}
                onAddReview={() => setShowReviewForm(true)}
              />
            )}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 操作按钮 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">订单操作</h3>
              <div className="space-y-3">
                {order.attributes.status === 'pending' && (
                  <button
                    onClick={() => navigate(`/payment/${order.id}`)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <FaCreditCard className="mr-2" />
                    立即支付
                  </button>
                )}
                
                {order.attributes.status === 'paid' && !selectedGuide && (
                  <button
                    onClick={() => setShowGuideMatching(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <FaUser className="mr-2" />
                    选择导游
                  </button>
                )}

                {order.attributes.status === 'completed' && !order.attributes.review && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                  >
                    <FaStar className="mr-2" />
                    评价订单
                  </button>
                )}
              </div>
            </div>

            {/* 联系信息 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">联系信息</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">客服电话</span>
                  <p className="font-medium">400-123-4567</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">客服邮箱</span>
                  <p className="font-medium">support@eictrip.com</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">服务时间</span>
                  <p className="font-medium">24/7 在线服务</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 导游匹配模态框 */}
        {showGuideMatching && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">选择导游</h2>
                  <button
                    onClick={() => setShowGuideMatching(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <GuideMatching
                  orderData={order}
                  onGuideSelect={handleGuideSelect}
                />
              </div>
            </div>
          </div>
        )}

        {/* 评价表单模态框 */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">写评价</h2>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <ReviewForm
                  entityType="tour"
                  entityId={tour?.id}
                  onSuccess={handleReviewSubmit}
                  onCancel={() => setShowReviewForm(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderDetail 