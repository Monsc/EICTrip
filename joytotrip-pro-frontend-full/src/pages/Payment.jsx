import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { FaCheckCircle, FaTimesCircle, FaArrowLeft } from 'react-icons/fa'
import PaymentForm from '../components/Payment/PaymentForm'
import { ordersAPI, toursAPI } from '../api'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

// 加载 Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_your_stripe_public_key_here')

function Payment() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [order, setOrder] = useState(null)
  const [tour, setTour] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null) // 'success', 'error', null

  // 获取订单和旅游产品信息
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true)
        
        // 获取订单详情
        const orderResponse = await ordersAPI.getOrderById(orderId)
        const orderData = orderResponse.data
        
        // 获取旅游产品详情
        const tourResponse = await toursAPI.getTourById(orderData.attributes.tour?.data?.id)
        const tourData = tourResponse.data
        
        setOrder(orderData)
        setTour(tourData)
      } catch (err) {
        setError('获取订单信息失败')
        console.error('获取订单信息失败:', err)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrderData()
    }
  }, [orderId])

  // 支付成功处理
  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentStatus('success')
    // 可以在这里添加成功后的逻辑，比如跳转到订单详情页
    setTimeout(() => {
      navigate(`/orders/${orderId}`)
    }, 3000)
  }

  // 支付失败处理
  const handlePaymentError = (error) => {
    setPaymentStatus('error')
    console.error('支付失败:', error)
  }

  // 如果正在加载
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="正在加载订单信息..." />
      </div>
    )
  }

  // 如果有错误
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
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
  if (!order || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">订单不存在</h1>
          <p className="text-gray-600 mb-6">您要支付的订单不存在或已被删除</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  // 支付成功页面
  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">支付成功！</h1>
          <p className="text-gray-600 mb-6">
            您的订单已支付成功，正在跳转到订单详情页...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  // 支付失败页面
  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">支付失败</h1>
          <p className="text-gray-600 mb-6">
            支付过程中出现错误，请重试或联系客服
          </p>
          <button
            onClick={() => setPaymentStatus(null)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors mr-4"
          >
            重新支付
          </button>
          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            查看订单
          </button>
        </div>
      </div>
    )
  }

  // 准备支付数据
  const paymentData = {
    orderId: order.id,
    productName: tour.attributes.title_zh || tour.attributes.title_en,
    quantity: order.attributes.quantity || 1,
    unitPrice: order.attributes.price || tour.attributes.price,
    totalAmount: order.attributes.totalAmount || order.attributes.price,
    customerName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.username,
    customerEmail: user?.email
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

        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">订单支付</h1>
          <p className="text-gray-600">请完成支付以确认您的订单</p>
        </div>

        {/* 支付表单 */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 订单详情 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">订单详情</h2>
              
              {/* 旅游产品信息 */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={tour.attributes.image?.data?.attributes?.url || 'https://via.placeholder.com/80x60'}
                    alt={tour.attributes.title_zh || tour.attributes.title_en}
                    className="w-20 h-15 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {tour.attributes.title_zh || tour.attributes.title_en}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tour.attributes.destination?.data?.attributes?.name || '目的地'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 订单信息 */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单号</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">预订日期</span>
                  <span className="font-medium">
                    {new Date(order.attributes.travelDate || order.attributes.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">人数</span>
                  <span className="font-medium">{order.attributes.quantity || 1} 人</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">单价</span>
                  <span className="font-medium">¥{order.attributes.price || tour.attributes.price}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>总计</span>
                  <span className="text-primary-600">¥{order.attributes.totalAmount || order.attributes.price}</span>
                </div>
              </div>
            </div>

            {/* 支付表单 */}
            <div>
              <Elements stripe={stripePromise}>
                <PaymentForm
                  orderData={paymentData}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
