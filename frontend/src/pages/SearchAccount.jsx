import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'

const SearchAccount = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { platform, service, isFreeTrialMode } = location.state || {}
  
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const platformConfig = {
    tiktok: {
      name: 'TikTok',
      icon: '🎵',
      placeholder: 'username',
      serviceName: service || 'Likes'
    },
    instagram: {
      name: 'Instagram',
      icon: '📸',
      placeholder: 'username',
      serviceName: service || 'Followers'
    },
    facebook: {
      name: 'Facebook',
      icon: '👥',
      placeholder: 'username',
      serviceName: service || 'Likes'
    },
    youtube: {
      name: 'YouTube',
      icon: '▶️',
      placeholder: 'username',
      serviceName: service || 'Views'
    }
  }

  const config = platformConfig[platform] || platformConfig.tiktok

  const handleSearch = (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsSearching(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      // Navigate based on mode
      if (isFreeTrialMode) {
        navigate('/free-trial-service', {
          state: {
            username: username,
            platform: platform,
            service: service
          }
        })
      } else {
        // Navigate to account profile page to show posts
        navigate('/account-profile', {
          state: {
            username: username,
            platform: platform
          }
        })
      }
    }, 1000)
  }

  return (
    <SectionWrapper background="gradient">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Buy {config.name} {config.serviceName} for Faster Popularity
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buy {config.name} {config.serviceName.toLowerCase()} from SocialBoost and grow your profile with the fast {config.name} {config.serviceName.toLowerCase()} increase.
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden border-2 border-gray-200 focus-within:border-primary-500 transition-colors">
              <div className="pl-6 pr-3 flex items-center">
                <span className="text-3xl">{config.icon}</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={config.placeholder}
                className="flex-1 py-5 px-3 text-lg text-gray-700 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSearching}
                className="bg-primary-600 text-white px-10 py-5 text-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'SEARCHING...' : 'SEARCH'}
              </button>
            </div>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <span className="font-medium">Secure Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-medium">Affordable For All</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <span className="font-medium">Saves Your Time</span>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex text-3xl">
              ⭐⭐⭐⭐⭐
            </div>
            <div className="text-4xl font-bold text-gray-900">4.9</div>
          </div>
          <div className="text-center">
            <div className="text-gray-700 font-medium mb-1">Rated 4.9 out of 5</div>
            <div className="text-gray-600">Based on <span className="font-semibold">1678+</span> Reviews</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Enter your {config.name} username to get started with our premium growth services
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Your information is secure and never shared</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default SearchAccount
