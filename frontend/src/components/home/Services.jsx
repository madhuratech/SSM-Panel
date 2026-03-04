import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../common/SectionWrapper'

const Services = () => {
  const navigate = useNavigate()
  
  const platforms = [
    {
      name: 'TikTok',
      icon: '🎵',
      description: 'Boost your TikTok presence with real followers, likes, and views.',
      path: 'tiktok',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Instagram',
      icon: '📸',
      description: 'Grow your Instagram account with authentic engagement.',
      path: 'instagram',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'Facebook',
      icon: '👥',
      description: 'Increase your Facebook reach with real likes and followers.',
      path: 'facebook',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'YouTube',
      icon: '▶️',
      description: 'Get more YouTube subscribers, views, and engagement.',
      path: 'youtube',
      gradient: 'from-red-500 to-red-600'
    }
  ]

  const handlePlatformClick = (platform) => {
    navigate('/search', { state: { platform: platform.path, service: null } })
  }

  return (
    <SectionWrapper background="white" id="services">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full filter blur-2xl opacity-30 animate-wave"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full filter blur-2xl opacity-30 animate-wave animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your social media platform and start growing today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handlePlatformClick(platform)}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left w-full border-2 border-transparent hover:border-transparent"
            >
              {/* Subtle background color on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Smooth animated flowing border */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id={`border-gradient-${platform.name}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={platform.name === 'TikTok' ? '#ec4899' : platform.name === 'Instagram' ? '#a855f7' : platform.name === 'Facebook' ? '#3b82f6' : '#ef4444'} stopOpacity="0" />
                    <stop offset="50%" stopColor={platform.name === 'TikTok' ? '#ec4899' : platform.name === 'Instagram' ? '#a855f7' : platform.name === 'Facebook' ? '#3b82f6' : '#ef4444'} stopOpacity="1" />
                    <stop offset="100%" stopColor={platform.name === 'TikTok' ? '#ec4899' : platform.name === 'Instagram' ? '#a855f7' : platform.name === 'Facebook' ? '#3b82f6' : '#ef4444'} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="15"
                  fill="none"
                  stroke={`url(#border-gradient-${platform.name})`}
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="animate-border-draw-smooth"
                />
              </svg>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${platform.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {platform.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {platform.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {platform.description}
                </p>

                <div className="mt-4 text-primary-600 font-semibold flex items-center group-hover:text-primary-700">
                  Get Started
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Services
