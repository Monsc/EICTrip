import React from 'react'
import { FaMapMarkerAlt, FaPlane } from 'react-icons/fa'

function TopDestinations() {
  const topDestinations = [
    {
      id: 1,
      name: 'Berlin',
      country: 'Germany',
      tours: 200,
      distance: '366 KM away',
      image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Zurich',
      country: 'Switzerland',
      tours: 320,
      distance: '577 KM away',
      image: 'https://images.unsplash.com/photo-1519482816300-1491f717646b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'New York',
      country: 'USA',
      tours: 58,
      distance: '327 KM away',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'London',
      country: 'UK',
      tours: 406,
      distance: '271 KM away',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Agra',
      country: 'India',
      tours: 37,
      distance: '780 KM away',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      name: 'Paris',
      country: 'France',
      tours: 74,
      distance: '872 KM away',
      image: 'https://images.unsplash.com/photo-1502602898535-0e2e4b5b0b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Top Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Top destinations are based on user search volumes.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topDestinations.map((destination) => (
            <div
              key={destination.id}
              className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* 渐变蒙版 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                {/* 飞机icon */}
                <FaPlane className="absolute top-4 right-4 text-white text-2xl opacity-80 drop-shadow-lg" />
              </div>
              {/* 内容区 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {destination.name}
                  </h3>
                  <span className="bg-primary-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {destination.tours}+ Tours
                  </span>
                </div>
                <div className="flex items-center justify-between text-gray-200">
                  <span className="text-sm font-medium">{destination.country}</span>
                  <span className="flex items-center text-xs">
                    <FaMapMarkerAlt className="mr-1 text-primary-400" />
                    {destination.distance}
                  </span>
                </div>
              </div>
              {/* 悬浮效果 */}
              <div className="absolute inset-0 bg-primary-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                  <p className="mb-4">{destination.country}</p>
                  <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
                    Explore {destination.tours}+ Tours
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  )
}

export default TopDestinations 