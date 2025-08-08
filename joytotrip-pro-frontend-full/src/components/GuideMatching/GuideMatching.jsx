import React, { useState, useEffect } from 'react'
import { FaStar, FaMapMarkerAlt, FaLanguage, FaClock, FaUser, FaCheckCircle } from 'react-icons/fa'
import { guidesAPI } from '../../api'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from '../LoadingSpinner'

function GuideMatching({ orderData, onGuideSelect }) {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [filters, setFilters] = useState({
    language: '',
    rating: 0,
    priceRange: 'all'
  })

  const { user } = useAuth()

  // 获取导游匹配推荐
  useEffect(() => {
    const fetchGuideMatches = async () => {
      try {
        setLoading(true)
        const response = await guidesAPI.getGuideMatches(orderData, {
          populate: '*',
          sort: 'rating:desc'
        })
        setGuides(response.data || [])
      } catch (err) {
        setError('获取导游推荐失败')
        console.error('获取导游推荐失败:', err)
      } finally {
        setLoading(false)
      }
    }

    if (orderData) {
      fetchGuideMatches()
    }
  }, [orderData])

  // 过滤导游
  const filteredGuides = guides.filter(guide => {
    const guideData = guide.attributes
    
    // 语言过滤
    if (filters.language && !guideData.languages?.includes(filters.language)) {
      return false
    }
    
    // 评分过滤
    if (filters.rating > 0 && guideData.rating < filters.rating) {
      return false
    }
    
    // 价格过滤
    if (filters.priceRange !== 'all') {
      const price = guideData.hourlyRate || 0
      switch (filters.priceRange) {
        case 'low':
          if (price > 100) return false
          break
        case 'medium':
          if (price < 100 || price > 200) return false
          break
        case 'high':
          if (price < 200) return false
          break
        default:
          break
      }
    }
    
    return true
  })

  // 选择导游
  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide)
    if (onGuideSelect) {
      onGuideSelect(guide)
    }
  }

  // 获取评分显示
  const renderRating = (rating) => {
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

  // 如果正在加载
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="正在为您匹配导游..." />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* 标题 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">导游匹配</h2>
        <p className="text-gray-600">
          根据您的需求，我们为您推荐了以下专业导游
        </p>
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* 过滤器 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">筛选条件</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 语言过滤 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              语言
            </label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">全部语言</option>
              <option value="中文">中文</option>
              <option value="English">English</option>
              <option value="日本語">日本語</option>
              <option value="한국어">한국어</option>
            </select>
          </div>

          {/* 评分过滤 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              最低评分
            </label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value={0}>全部评分</option>
              <option value={4}>4星以上</option>
              <option value={4.5}>4.5星以上</option>
              <option value={5}>5星</option>
            </select>
          </div>

          {/* 价格过滤 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              价格范围
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">全部价格</option>
              <option value="low">¥100以下/小时</option>
              <option value="medium">¥100-200/小时</option>
              <option value="high">¥200以上/小时</option>
            </select>
          </div>
        </div>
      </div>

      {/* 导游列表 */}
      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无匹配导游</h3>
          <p className="text-gray-600 mb-6">
            请尝试调整筛选条件或联系客服获取帮助
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedGuide?.id === guide.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
              onClick={() => handleGuideSelect(guide)}
            >
              <div className="flex items-start space-x-4">
                {/* 导游头像 */}
                <div className="flex-shrink-0">
                  <img
                    src={guide.attributes.avatar?.data?.attributes?.url || 'https://via.placeholder.com/80x80'}
                    alt={guide.attributes.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>

                {/* 导游信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {guide.attributes.name}
                    </h3>
                    {selectedGuide?.id === guide.id && (
                      <FaCheckCircle className="text-primary-600 text-xl" />
                    )}
                  </div>

                  {/* 评分和基本信息 */}
                  <div className="flex items-center space-x-4 mb-3">
                    {renderRating(guide.attributes.rating || 0)}
                    <span className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      {guide.attributes.location || '未知地点'}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <FaUser className="mr-1" />
                      {guide.attributes.experience || 0}年经验
                    </span>
                  </div>

                  {/* 语言和专长 */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className="flex items-center">
                        <FaLanguage className="mr-1" />
                        语言: {guide.attributes.languages?.join(', ') || '中文'}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        ¥{guide.attributes.hourlyRate || 0}/小时
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      专长: {guide.attributes.specialties?.join(', ') || '暂无专长信息'}
                    </p>
                  </div>

                  {/* 简介 */}
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {guide.attributes.description || '暂无简介'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 选择提示 */}
      {selectedGuide && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-600 mr-2" />
            <span className="text-green-800">
              已选择导游: {selectedGuide.attributes.name}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuideMatching
