import React, { useState, useEffect } from 'react'
import { FaStar, FaThumbsUp, FaThumbsDown, FaUser, FaCalendarAlt } from 'react-icons/fa'
import { reviewsAPI } from '../../api'
import LoadingSpinner from '../LoadingSpinner'

function ReviewList({ entityType, entityId, showAddButton = false, onAddReview }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)
  const [filter, setFilter] = useState('all') // all, positive, neutral, negative
  const [sortBy, setSortBy] = useState('date') // date, rating

  // 获取评价列表
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        
        // 获取评价列表
        const reviewsResponse = await reviewsAPI.getReviews({
          filters: {
            entityType,
            entityId
          },
          populate: 'user',
          sort: sortBy === 'date' ? 'createdAt:desc' : 'rating:desc'
        })
        
        // 获取评价统计
        const statsResponse = await reviewsAPI.getReviewStats(entityType, entityId)
        
        setReviews(reviewsResponse.data || [])
        setStats(statsResponse.data)
      } catch (err) {
        setError('获取评价失败')
        console.error('获取评价失败:', err)
      } finally {
        setLoading(false)
      }
    }

    if (entityType && entityId) {
      fetchReviews()
    }
  }, [entityType, entityId, sortBy])

  // 过滤评价
  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true
    return review.attributes.overallExperience === filter
  })

  // 渲染星级评分
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  // 渲染整体体验标签
  const renderExperienceTag = (experience) => {
    const config = {
      positive: { text: '满意', class: 'bg-green-100 text-green-800' },
      neutral: { text: '一般', class: 'bg-yellow-100 text-yellow-800' },
      negative: { text: '不满意', class: 'bg-red-100 text-red-800' }
    }

    const { text, class: className } = config[experience] || config.neutral

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
        {text}
      </span>
    )
  }

  // 如果正在加载
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="正在加载评价..." />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* 标题和统计 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">用户评价</h2>
          {showAddButton && (
            <button
              onClick={onAddReview}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              写评价
            </button>
          )}
        </div>

        {/* 评价统计 */}
        {stats && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {stats.averageRating?.toFixed(1) || '0.0'}
                </div>
                <div className="text-sm text-gray-600">平均评分</div>
                {renderStars(stats.averageRating || 0)}
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalReviews || 0}
                </div>
                <div className="text-sm text-gray-600">总评价数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.positivePercentage || 0}%
                </div>
                <div className="text-sm text-gray-600">满意率</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.recentReviews || 0}
                </div>
                <div className="text-sm text-gray-600">近期评价</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* 过滤和排序 */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">筛选:</span>
          {[
            { key: 'all', label: '全部' },
            { key: 'positive', label: '满意' },
            { key: 'neutral', label: '一般' },
            { key: 'negative', label: '不满意' }
          ].map(option => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === option.key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">排序:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="date">按时间</option>
            <option value="rating">按评分</option>
          </select>
        </div>
      </div>

      {/* 评价列表 */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无评价</h3>
          <p className="text-gray-600 mb-6">
            {showAddButton ? '成为第一个评价的用户吧！' : '还没有用户评价'}
          </p>
          {showAddButton && (
            <button
              onClick={onAddReview}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              写评价
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              {/* 评价头部 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {review.attributes.user?.data?.attributes?.username || '匿名用户'}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaCalendarAlt className="w-3 h-3" />
                      <span>
                        {new Date(review.attributes.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {renderExperienceTag(review.attributes.overallExperience)}
                  {renderStars(review.attributes.rating)}
                </div>
              </div>

              {/* 评价标题 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {review.attributes.title}
              </h3>

              {/* 评价内容 */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {review.attributes.content}
              </p>

              {/* 优点和缺点 */}
              {(review.attributes.pros || review.attributes.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {review.attributes.pros && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <FaThumbsUp className="text-green-600 mr-2" />
                        <span className="font-medium text-green-800">优点</span>
                      </div>
                      <p className="text-sm text-green-700">{review.attributes.pros}</p>
                    </div>
                  )}
                  {review.attributes.cons && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="flex items-center mb-2">
                        <FaThumbsDown className="text-red-600 mr-2" />
                        <span className="font-medium text-red-800">需要改进</span>
                      </div>
                      <p className="text-sm text-red-700">{review.attributes.cons}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewList
