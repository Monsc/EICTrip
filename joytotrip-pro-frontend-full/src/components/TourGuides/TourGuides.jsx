import React from 'react'
import { FaStar, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'

function TourGuides() {
  const guides = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Adventure Tours',
      location: 'New York, USA',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '5+ years',
      languages: ['English', 'Spanish']
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Cultural Tours',
      location: 'Tokyo, Japan',
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '8+ years',
      languages: ['English', 'Japanese', 'Mandarin']
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      specialty: 'Food & Wine Tours',
      location: 'Barcelona, Spain',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '6+ years',
      languages: ['English', 'Spanish', 'Catalan']
    },
    {
      id: 4,
      name: 'David Kim',
      specialty: 'Photography Tours',
      location: 'Seoul, South Korea',
      rating: 4.7,
      reviews: 73,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      experience: '4+ years',
      languages: ['English', 'Korean']
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Our Tour Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our experienced and passionate travel guides who will make your journey unforgettable.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Avatar */}
              <div className="relative p-6 pb-0">
                <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  <FaStar className="inline-block mr-1" />
                  {guide.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {guide.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {guide.specialty}
                </p>
                
                {/* Location */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <FaMapMarkerAlt className="mr-2 text-primary-500" />
                  {guide.location}
                </div>

                {/* Experience & Reviews */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">
                    {guide.experience} experience
                  </span>
                  <span className="text-sm text-gray-500">
                    {guide.reviews} reviews
                  </span>
                </div>

                {/* Languages */}
                <div className="flex items-center mb-4">
                  <FaGlobe className="text-primary-500 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
                  Contact Guide
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-secondary text-lg px-8 py-3">
            View All Guides
          </button>
        </div>
      </div>
    </section>
  )
}

export default TourGuides 