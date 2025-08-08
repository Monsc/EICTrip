import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FaSearch, 
  FaUser, 
  FaGlobe, 
  FaDollarSign, 
  FaBars, 
  FaTimes,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  
  const { user, isAuthenticated, logout } = useAuth()
  const userDropdownRef = useRef(null)

  // 点击外部关闭用户下拉菜单
  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const destinations = [
    { name: 'Africa', countries: ['Botswana', 'Egypt', 'Kenya', 'Morocco', 'South Africa', 'Tanzania'] },
    { name: 'Asia', countries: ['Bali', 'China', 'India', 'Japan', 'Thailand', 'Vietnam'] },
    { name: 'Europe', countries: ['France', 'Germany', 'Italy', 'Spain', 'Switzerland', 'UK'] },
    { name: 'Americas', countries: ['USA', 'Canada', 'Brazil', 'Mexico', 'Peru'] }
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>📞 +1 (555) 123-4567</span>
            <span>📧 info@eictrip.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-transparent border-none text-white">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
            <select className="bg-transparent border-none text-white">
              <option>English</option>
              <option>中文</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            EICTrip
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </Link>
            
            {/* Destinations Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors flex items-center"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                Destinations
                <FaGlobe className="ml-1" />
              </button>
              
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-96 bg-white shadow-xl rounded-lg border p-4 grid grid-cols-2 gap-4"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {destinations.map((region) => (
                    <div key={region.name}>
                      <h4 className="font-semibold text-primary-600 mb-2">{region.name}</h4>
                      <ul className="space-y-1">
                        {region.countries.slice(0, 6).map((country) => (
                          <li key={country}>
                            <Link 
                              to={`/destinations/${country.toLowerCase()}`}
                              className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                            >
                              {country}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link to="/tours" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Tours
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FaSearch />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FaHeart />
            </button>
            <Link to="/my-orders" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
              <FaShoppingCart />
            </Link>
            
            {/* 用户认证状态 */}
            {isAuthenticated ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-primary-600" />
                  </div>
                  <span className="font-medium">
                    {user?.firstName || user?.username || '用户'}
                  </span>
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaUser className="mr-2" />
                      个人资料
                    </Link>
                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      我的订单
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaCog className="mr-2" />
                      设置
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  <FaUser className="mr-2" />
                  登录
                </Link>
                <Link to="/register" className="btn-primary">
                  注册
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Home
              </Link>
              <Link to="/destinations" className="text-gray-700 hover:text-primary-600 font-medium">
                Destinations
              </Link>
              <Link to="/tours" className="text-gray-700 hover:text-primary-600 font-medium">
                Tours
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
                Contact
              </Link>
              <div className="flex space-x-4 pt-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="btn-secondary flex-1 text-center">
                      个人资料
                    </Link>
                    <button onClick={logout} className="btn-primary flex-1 text-center">
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-secondary flex-1 text-center">
                      登录
                    </Link>
                    <Link to="/register" className="btn-primary flex-1 text-center">
                      注册
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 