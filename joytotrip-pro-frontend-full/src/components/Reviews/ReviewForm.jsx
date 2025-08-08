import React, { useState } from 'react'
import { FaStar, FaSmile, FaMeh, FaFrown } from 'react-icons/fa'
import { reviewsAPI } from '../../api'

function ReviewForm({ entityType, entityId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    pros: '',
    cons: '',
    overallExperience: 'positive'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 处理表单输入
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 处理评分选择
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
  }

  // 处理整体体验选择
  const handleExperienceChange = (experience) => {
    setFormData(prev => ({
      ...prev,
      overallExperience: experience
    }))
  }

  // 提交评价
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.rating === 0) {
      setError('请选择评分')
      return
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('请填写标题和评价内容')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const reviewData = {
        data: {
          entityType, // 'tour' 或 'guide'
          entityId,
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
          pros: formData.pros,
          cons: formData.cons,
          overallExperience: formData.overallExperience
        }
      }

      await reviewsAPI.addReview(reviewData)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError('提交评价失败，请重试')
      console.error('提交评价失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 渲染星级评分
  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(star)}
            className="focus:outline-none"
          >
            <FaStar
              className={`w-8 h-8 transition-colors ${
                star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400`}
            />
          </button>
        ))}
        <span className="ml-3 text-sm text-gray-600">
          {formData.rating > 0 ? `${formData.rating}星` : '请选择评分'}
        </span>
      </div>
    )
  }

  // 渲染整体体验选择
  const renderExperienceOptions = () => {
    const options = [
      { value: 'positive', icon: FaSmile, label: '满意', color: 'text-green-500' },
      { value: 'neutral', icon: FaMeh, label: '一般', color: 'text-yellow-500' },
      { value: 'negative', icon: FaFrown, label: '不满意', color: 'text-red-500' }
    ]

    return (
      <div className="flex items-center space-x-6">
        {options.map((option) => {
          const Icon = option.icon
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleExperienceChange(option.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                formData.overallExperience === option.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${option.color}`} />
              <span className="text-sm font-medium text-gray-700">{option.label}</span>
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">写评价</h2>
        <p className="text-gray-600">
          分享您的体验，帮助其他用户做出更好的选择
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 错误信息 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* 评分 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            总体评分 *
          </label>
          {renderStars()}
        </div>

        {/* 整体体验 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            整体体验
          </label>
          {renderExperienceOptions()}
        </div>

        {/* 评价标题 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评价标题 *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="用一句话总结您的体验"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            maxLength={100}
          />
        </div>

        {/* 评价内容 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            详细评价 *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="详细描述您的体验，包括服务、景点、导游等方面的感受"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            maxLength={1000}
          />
          <div className="text-xs text-gray-500 mt-1">
            {formData.content.length}/1000
          </div>
        </div>

        {/* 优点 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            优点
          </label>
          <textarea
            name="pros"
            value={formData.pros}
            onChange={handleInputChange}
            placeholder="这次体验中您觉得好的地方"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            maxLength={300}
          />
        </div>

        {/* 缺点 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            需要改进的地方
          </label>
          <textarea
            name="cons"
            value={formData.cons}
            onChange={handleInputChange}
            placeholder="这次体验中可以改进的地方"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            maxLength={300}
          />
        </div>

        {/* 提交按钮 */}
        <div className="flex items-center justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                提交中...
              </>
            ) : (
              '提交评价'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
