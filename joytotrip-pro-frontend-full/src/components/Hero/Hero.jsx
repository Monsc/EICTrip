import React, { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa'

function Hero() {
  const [searchData, setSearchData] = useState({
    location: '',
    activity: '',
    date: '',
    guests: ''
  })

  const activities = [
    'Sea & Sailing',
    'Trekking tours', 
    'Parachuting',
    'Train travel',
    'Ancient sites',
    'City Tours',
    'Hiking Trips',
    'Jungle Safari'
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search:', searchData)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Explore the exotic world.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 animate-slide-up">
            City tours made for Marco Polo in you
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-slide-up">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                  className="w-full pl-10 pr-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Activity */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={searchData.activity}
                  onChange={(e) => setSearchData({...searchData, activity: e.target.value})}
                  className="w-full pl-10 pr-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none"
                >
                  <option value="">Activity</option>
                  {activities.map((activity) => (
                    <option key={activity} value={activity} className="text-gray-800">
                      {activity}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                  className="w-full pl-10 pr-4 py-4 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">500+</div>
              <div className="text-gray-300">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">10K+</div>
              <div className="text-gray-300">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-400">24/7</div>
              <div className="text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero 