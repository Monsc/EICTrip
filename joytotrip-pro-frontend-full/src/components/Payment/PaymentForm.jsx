import React, { useState, useEffect } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { FaCreditCard, FaLock, FaShieldAlt } from 'react-icons/fa'
import { paymentsAPI } from '../../api'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

function PaymentForm({ orderData, onSuccess, onError }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  
  const stripe = useStripe()
  const elements = useElements()

  // 创建支付意图
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await paymentsAPI.createStripeCheckoutSession({
          ...orderData,
          currency: 'usd',
          payment_method_types: ['card']
        })
        setClientSecret(response.client_secret)
      } catch (err) {
        setError('创建支付会话失败')
        onError(err)
      }
    }

    if (orderData) {
      createPaymentIntent()
    }
  }, [orderData, onError])

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements || !clientSecret) {
      return
    }

    setLoading(true)
    setError(null)

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: orderData.customerName,
            email: orderData.customerEmail,
          },
        },
      }
    )

    if (stripeError) {
      setError(stripeError.message || '支付失败')
      onError(stripeError)
    } else if (paymentIntent.status === 'succeeded') {
      // 支付成功，更新订单状态
      try {
        await paymentsAPI.handlePaymentSuccess(orderData.orderId)
        onSuccess(paymentIntent)
      } catch (err) {
        setError('订单更新失败，但支付已成功')
        onError(err)
      }
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">支付信息</h2>
        <p className="text-gray-600">请填写您的支付信息</p>
      </div>

      {/* 安全提示 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <FaShieldAlt className="text-blue-500 mr-2" />
          <span className="text-sm text-blue-700">
            您的支付信息已加密，安全可靠
          </span>
        </div>
      </div>

      {/* 订单摘要 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">订单摘要</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">产品名称</span>
            <span className="font-medium">{orderData.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">数量</span>
            <span className="font-medium">{orderData.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">单价</span>
            <span className="font-medium">¥{orderData.unitPrice}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>总计</span>
            <span className="text-primary-600">¥{orderData.totalAmount}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* 信用卡信息 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaCreditCard className="inline mr-2" />
            信用卡信息
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* 账单信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              持卡人姓名
            </label>
            <input
              type="text"
              defaultValue={orderData.customerName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="请输入持卡人姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              邮箱地址
            </label>
            <input
              type="email"
              defaultValue={orderData.customerEmail}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="请输入邮箱地址"
            />
          </div>
        </div>

        {/* 支付按钮 */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              处理中...
            </>
          ) : (
            <>
              <FaLock className="mr-2" />
              立即支付 ¥{orderData.totalAmount}
            </>
          )}
        </button>

        {/* 支付说明 */}
        <div className="text-xs text-gray-500 text-center">
          <p>点击"立即支付"即表示您同意我们的服务条款</p>
          <p>支付完成后，您将收到确认邮件</p>
        </div>
      </form>
    </div>
  )
}

export default PaymentForm
