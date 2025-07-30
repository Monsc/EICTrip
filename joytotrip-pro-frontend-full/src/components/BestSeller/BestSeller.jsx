import React from 'react'
import { FaStar, FaClock } from 'react-icons/fa'

function BestSeller() {
  const bestSellers = [
    {
      id: 1,
      title: 'Train Tour Skyline',
      days: 10,
      nights: 9,
      price: 895.5,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Train Tour Skyline',
      days: 10,
      nights: 9,
      price: 895.5,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Train Tour Skyline',
      days: 10,
      nights: 9,
      price: 895.5,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Best Seller
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The best sellers are based on sales volume.
          </p>
        </div>

        {/* Best Seller Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((item) => (
            <div
              key={item.id}
              className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* 评分 */}
                <div className="absolute top-4 left-4 bg-white/90 text-primary-600 px-3 py-1 rounded-full text-sm font-bold shadow">
                  <FaStar className="inline-block text-yellow-400 mr-1" />
                  {item.rating}
                </div>
              </div>
              {/* 内容区 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-bold text-primary-600">
                    {item.days} Days | {item.nights} Nights
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    ${item.price}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 mb-4 text-sm">
                  Check Out Daily Deals and Promotion on Hotels. Easy & Fast Booking
                </p>
                <button className="btn-primary w-full text-lg py-3 shadow hover:shadow-lg">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller 