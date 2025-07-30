import React from 'react'
import { FaStar, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa'

function TrendingTours() {
  const trendingTours = [
    {
      id: 1,
      title: "Full-Day Catamaran Cruise to Hvar & Pakleni Islands",
      category: "Beach Tours",
      location: "Dubrovnik",
      price: 895,
      rating: 4.7,
      reviews: 577,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      discount: 20,
      badges: ["New on JoyToTrip", "Free Cancellation"]
    },
    {
      id: 2,
      title: "Circle Line: Complete Manhattan Island Cruise",
      category: "City Tour",
      location: "New York",
      price: 795,
      rating: 4.3,
      reviews: 109,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Best Seller", "Free Cancellation"]
    },
    {
      id: 3,
      title: "Blue Lagoon & 3 Islands Half-day Trip from Split",
      category: "Hiking Tour",
      location: "Stoke on Trent",
      price: 695,
      rating: 5.0,
      reviews: 208,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Free Lunch", "Free Cancellation"]
    },
    {
      id: 4,
      title: "Private Tour: Montenegro Day Trip from Dubrovnik",
      category: "Hiking Tour",
      location: "Stoke on Trent",
      price: 995,
      rating: 4.5,
      reviews: 6718,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["All Access", "Free Cancellation"]
    },
    {
      id: 5,
      title: "Old Town, Dubai Creek, Souks, and Street Food Tour",
      category: "Hiking Tour",
      location: "Stoke on Trent",
      price: 395,
      rating: 4.7,
      reviews: 310,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["5 Seats Left", "Free Cancellation"]
    },
    {
      id: 6,
      title: "Hamilton Live! Walking Tour in lower Manhattan",
      category: "Hiking Tour",
      location: "Stoke on Trent",
      price: 295,
      rating: 4.3,
      reviews: 205,
      duration: "7 Days",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badges: ["Trending", "Free Cancellation"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Trending 2024
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The trending tours are based on user bookings.
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