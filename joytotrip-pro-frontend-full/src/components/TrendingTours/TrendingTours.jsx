import React, { useState, useEffect } from 'react'
import { FaStar, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa'
import { toursAPI } from '../../api'
import LoadingSpinner from '../LoadingSpinner'

function TrendingTours() {
  const [trendingTours, setTrendingTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 获取热门旅游产品数据
  useEffect(() => {
    const fetchTrendingTours = async () => {
      try {
        setLoading(true)
        const response = await toursAPI.getTrendingTours(6)
        
        // 转换 Strapi 数据格式为组件需要的格式
        const tours = response.data.map(tour => ({
          id: tour.id,
          title: tour.attributes.title_zh || tour.attributes.title_en,
          category: tour.attributes.category?.data?.attributes?.name || '旅游',
          location: tour.attributes.destination?.data?.attributes?.name || '目的地',
          price: parseFloat(tour.attributes.price) || 0,
          rating: 4.5, // 默认评分
          reviews: Math.floor(Math.random() * 500) + 50, // 随机评论数
          duration: `${tour.attributes.days || 7} 天`,
          image: tour.attributes.image?.data?.attributes?.url || 
                 `https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
          badges: ["热门推荐", "免费取消"]
        }))
        
        setTrendingTours(tours)
      } catch (err) {
        console.error('获取热门旅游产品失败:', err)
        setError('获取数据失败，请稍后重试')
        
        // 如果 API 失败，使用默认数据
        setTrendingTours([
          {
            id: 1,
            title: "克罗地亚杜布罗夫尼克全日游",
            category: "海滩旅游",
            location: "杜布罗夫尼克",
            price: 895,
            rating: 4.7,
            reviews: 577,
            duration: "7 天",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badges: ["EICTrip 推荐", "免费取消"]
          },
          {
            id: 2,
            title: "纽约曼哈顿环岛游船",
            category: "城市观光",
            location: "纽约",
            price: 795,
            rating: 4.3,
            reviews: 109,
            duration: "7 天",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badges: ["畅销产品", "免费取消"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingTours()
  }, [])

  // 显示加载状态
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              热门推荐 2024
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基于用户预订的热门旅游产品
            </p>
          </div>
          <LoadingSpinner size="lg" text="正在加载热门旅游产品..." />
        </div>
      </section>
    )
  }

  // 显示错误状态
  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              热门推荐 2024
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基于用户预订的热门旅游产品
            </p>
          </div>
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            热门推荐 2024
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            基于用户预订的热门旅游产品
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingTours.map((tour) => (
            <div key={tour.id} className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              {/* Image Container */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Discount Badge */}
                {tour.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    -{tour.discount}% Today
                  </div>
                )}
                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors shadow">
                  <FaHeart className="text-gray-600 hover:text-red-500" />
                </button>
                {/* Badges */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                  {tour.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium shadow"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {tour.title}
                </h3>
                {/* Category and Location */}
                <div className="flex items-center text-gray-600 mb-3">
                  <FaMapMarkerAlt className="mr-1 text-primary-500" />
                  <span className="text-sm">{tour.category} | {tour.location}</span>
                </div>
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{tour.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm">({tour.reviews})</span>
                  <div className="flex items-center ml-auto">
                    <FaClock className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{tour.duration}</span>
                  </div>
                </div>
                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">from</span>
                    <span className="text-2xl font-bold text-primary-600 ml-1">
                      ${tour.price}
                    </span>
                  </div>
                  <button className="btn-primary text-sm py-2 px-4 shadow hover:shadow-lg">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary text-lg px-8 py-4 shadow hover:shadow-lg">
            View All Trending Tours
          </button>
        </div>
      </div>
    </section>
  )
}

export default TrendingTours 