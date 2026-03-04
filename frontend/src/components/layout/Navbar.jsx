import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { authAPI } from '../../utils/auth'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [closeTimeout, setCloseTimeout] = useState(null)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = authAPI.getUser()
    setUser(loggedInUser)
  }, [location])

  const handleLogout = () => {
    authAPI.logout()
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
  }

  const platforms = [
    {
      name: 'TikTok',
      path: '/tiktok',
      services: [
        { name: 'TikTok Views', service: 'views' },
        { name: 'TikTok Followers', service: 'followers' },
        { name: 'TikTok Likes', service: 'likes' },
        { name: 'TikTok Comments', service: 'comments' }
      ]
    },
    {
      name: 'Instagram',
      path: '/instagram',
      services: [
        { name: 'Instagram Followers', service: 'followers' },
        { name: 'Instagram Likes', service: 'likes' },
        { name: 'Instagram Views', service: 'views' },
        { name: 'Instagram Comments', service: 'comments' }
      ]
    },
    {
      name: 'Facebook',
      path: '/facebook',
      services: [
        { name: 'Facebook Likes', service: 'likes' },
        { name: 'Facebook Followers', service: 'followers' },
        { name: 'Facebook Views', service: 'views' },
        { name: 'Facebook Comments', service: 'comments' }
      ]
    },
    {
      name: 'YouTube',
      path: '/youtube',
      services: [
        { name: 'YouTube Views', service: 'views' },
        { name: 'YouTube Subscribers', service: 'subscribers' },
        { name: 'YouTube Likes', service: 'likes' },
        { name: 'YouTube Comments', service: 'comments' }
      ]
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleServiceClick = (platformPath) => {
    navigate(platformPath)
    setActiveDropdown(null)
  }

  const handleMouseEnter = (dropdown) => {
    // Clear any pending close timeout
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    // Add a delay before closing the dropdown
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 300) // 300ms delay
    setCloseTimeout(timeout)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary-600"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            SocialBoost
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('all-services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="font-medium transition-colors flex items-center space-x-1 text-gray-700 hover:text-primary-600"
              >
                <span>All Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {activeDropdown === 'all-services' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-4 border border-gray-100 max-h-96 overflow-y-auto"
                  onMouseEnter={() => handleMouseEnter('all-services')}
                  onMouseLeave={handleMouseLeave}
                >
                  {platforms.map((platform) => (
                    <div key={platform.name} className="mb-4 last:mb-0">
                      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {platform.name}
                      </div>
                      <div className="space-y-1">
                        {platform.services.map((service) => (
                          <button
                            key={service.service}
                            onClick={() => handleServiceClick(platform.path)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {service.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(platform.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={platform.path}
                  className={`font-medium transition-colors flex items-center space-x-1 ${
                    isActive(platform.path)
                      ? 'text-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span>{platform.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {activeDropdown === platform.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                    onMouseEnter={() => handleMouseEnter(platform.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {platform.services.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => handleServiceClick(platform.path)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/free-trial"
              className="font-medium transition-colors text-gray-700 hover:text-primary-600"
            >
              Free Trial
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      My Orders
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
            <div className="space-y-3 pt-4">
              <div className="space-y-2">
                <div className="py-2 font-medium text-gray-900">All Services</div>
                {platforms.map((platform) => (
                  <div key={`mobile-${platform.name}`} className="pl-4 space-y-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {platform.name}
                    </div>
                    <div className="pl-2 space-y-1">
                      {platform.services.map((service) => (
                        <button
                          key={service.service}
                          onClick={() => {
                            handleServiceClick(platform.path)
                            setIsOpen(false)
                          }}
                          className="block w-full text-left py-1 text-sm text-gray-600 hover:text-primary-600"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {platforms.map((platform) => (
                <div key={platform.name} className="space-y-2">
                  <Link
                    to={platform.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 font-medium ${
                      isActive(platform.path) ? 'text-primary-600' : 'text-gray-700'
                    }`}
                  >
                    {platform.name}
                  </Link>
                  <div className="pl-4 space-y-1">
                    {platform.services.map((service) => (
                      <button
                        key={service.service}
                        onClick={() => {
                          handleServiceClick(platform.path)
                          setIsOpen(false)
                        }}
                        className="block w-full text-left py-1 text-sm text-gray-600 hover:text-primary-600"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <Link
                to="/free-trial"
                onClick={() => setIsOpen(false)}
                className="block py-2 font-medium text-gray-700 text-center"
              >
                Free Trial
              </Link>

              <div className="space-y-2 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button fullWidth variant="secondary" size="sm">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button fullWidth size="sm">Register</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
