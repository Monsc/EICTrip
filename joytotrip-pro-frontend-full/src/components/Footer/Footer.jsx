import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaLinkedin, 
  FaHeadset,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">JoyToTrip</h3>
            <p className="text-gray-300 mb-6">
              The Brilliant reasons JoyToTrip be your one-stop-shop for unforgettable travel experiences!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-full transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-full transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-full transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-primary-600 hover:bg-primary-700 p-2 rounded-full transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services/budget-tours" className="hover:text-primary-400 transition-colors">Budget Tours</Link></li>
              <li><Link to="/services/expert-insight" className="hover:text-primary-400 transition-colors">Expert Insight</Link></li>
              <li><Link to="/services/independent" className="hover:text-primary-400 transition-colors">Independent</Link></li>
              <li><Link to="/services/luxury-tours" className="hover:text-primary-400 transition-colors">Luxury Tours</Link></li>
              <li><Link to="/services/safety-tips" className="hover:text-primary-400 transition-colors">Safety Tips</Link></li>
              <li><Link to="/services/tips-tricks" className="hover:text-primary-400 transition-colors">Tips n Tricks</Link></li>
            </ul>
          </div>

          {/* Adventures */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Adventures</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/adventures/beach-activity" className="hover:text-primary-400 transition-colors">Beach Activity</Link></li>
              <li><Link to="/adventures/bungee-jump" className="hover:text-primary-400 transition-colors">Bungee Jump</Link></li>
              <li><Link to="/adventures/city-tour" className="hover:text-primary-400 transition-colors">City Tour</Link></li>
              <li><Link to="/adventures/hiking-trips" className="hover:text-primary-400 transition-colors">Hiking Trips</Link></li>
              <li><Link to="/adventures/jungle-safari" className="hover:text-primary-400 transition-colors">Jungle Safari</Link></li>
              <li><Link to="/adventures/night-city-walk" className="hover:text-primary-400 transition-colors">Night City Walk</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-primary-400" />
                <span>Nepal, USA, India</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-primary-400" />
                <span>info@joytotrip.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-primary-400" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sales Support */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <FaHeadset className="text-3xl text-primary-400 mr-3" />
                <h3 className="text-xl font-semibold">For Sales</h3>
              </div>
              <p className="text-gray-300 mb-2">
                The Brilliant reasons JoyToTrip be your one-stop-shop!
              </p>
              <div className="text-primary-400">
                <div>sales@joytotrip.com</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <FaHeadset className="text-3xl text-primary-400 mr-3" />
                <h3 className="text-xl font-semibold">Help & Support</h3>
              </div>
              <p className="text-gray-300 mb-2">
                We are available 24/7 to answer our clients queries.
              </p>
              <div className="text-primary-400">
                <div>support@joytotrip.com</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 JoyToTrip. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">Payments</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-gray-600 rounded"></div>
                  <div className="w-8 h-5 bg-gray-600 rounded"></div>
                  <div className="w-8 h-5 bg-gray-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 