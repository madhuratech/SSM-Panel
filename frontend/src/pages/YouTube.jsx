import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { socialMediaAPI } from '../utils/socialMedia'

const YouTube = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [searchMode, setSearchMode] = useState('channel')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setIsSearching(true)
    setError('')

    try {
      const response = await socialMediaAPI.fetchYouTubeChannel(username.trim())
      
      if (response.success || response.data) {
        navigate('/account-profile', {
          state: {
            platform: 'youtube',
            username: username.trim(),
            channelData: response.data,
            isFallback: response.isFallback
          }
        })
      } else {
        setError('Channel not found. Please check the name and try again.')
      }
    } catch (err) {
      navigate('/account-profile', {
        state: {
          platform: 'youtube',
          username: username.trim()
        }
      })
    } finally {
      setIsSearching(false)
    }
  }

  const services = [
    { icon: '👁️', name: 'Views', desc: 'Increase video views' },
    { icon: '👥', name: 'Subscribers', desc: 'Gain real subscribers' },
    { icon: '❤️', name: 'Likes', desc: 'Boost video likes' },
    { icon: '💬', name: 'Comments', desc: 'Get more comments' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Boost Your <span className="text-red-600">YouTube</span> Presence
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grow your YouTube channel with real subscribers, views, likes, and comments from genuine users.
          </p>
        </div>

        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 focus-within:border-red-500 transition-all">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 md:p-0 md:pl-6 flex items-center justify-center md:justify-start">
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setSearchMode('channel')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchMode === 'channel' ? 'bg-white shadow text-red-600' : 'text-gray-600'}`}
                    >
                      Channel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchMode('video')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${searchMode === 'video' ? 'bg-white shadow text-red-600' : 'text-gray-600'}`}
                    >
                      Video URL
                    </button>
                  </div>
                </div>
                <input
                  type={searchMode === 'video' ? 'url' : 'text'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={searchMode === 'channel' ? 'Enter YouTube channel name or @username' : 'Enter YouTube video URL'}
                  className="flex-1 py-4 px-5 text-lg text-gray-700 focus:outline-none bg-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-10 py-4 text-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      SEARCHING...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      SEARCH
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          {error && (
            <p className="mt-3 text-center text-red-600 font-medium">{error}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-center">
              <div className="text-3xl mb-2">{service.icon}</div>
              <div className="font-semibold text-gray-900">{service.name}</div>
              <div className="text-sm text-gray-500">{service.desc}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium">Secure Service</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium">Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="font-medium">Money Back</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex text-2xl">⭐⭐⭐⭐⭐</div>
            <div className="text-4xl font-bold text-gray-900">4.9</div>
          </div>
          <div className="text-center">
            <div className="text-gray-700 font-medium mb-1">Rated 4.9 out of 5</div>
            <div className="text-gray-600">Based on <span className="font-semibold text-primary-600">2,500+</span> Reviews</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-3">
            Enter your YouTube channel name to view your profile and select videos to boost
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
            </svg>
            <span>Your information is secure and never shared</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTube
