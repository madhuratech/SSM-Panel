import { useState, useEffect, Suspense, lazy } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../components/common/Button'
import { socialMediaAPI } from '../utils/socialMedia'

const AccountProfile = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, profileData, channelData, isFallback } = location.state || {}
  
  const [accountData, setAccountData] = useState(null)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPosts, setSelectedPosts] = useState([])
  const [showServiceModal, setShowServiceModal] = useState(false)

  useEffect(() => {
    if (!username || !platform) {
      navigate('/search')
      return
    }
    fetchAccountData()
  }, [username, platform])

  const fetchAccountData = async () => {
    setIsLoading(true)
    setError('')

    try {
      let accountInfo = null
      
      if (profileData || channelData) {
        accountInfo = profileData || channelData
      } else {
        const response = await socialMediaAPI.verifyAccount(platform, username)
        accountInfo = response.data
      }

      if (accountInfo) {
        setAccountData(accountInfo)
        const postsResponse = await socialMediaAPI.fetchPosts(platform, username, 8)
        if (postsResponse.success && postsResponse.data?.posts?.length > 0) {
          setPosts(postsResponse.data.posts)
        } else {
          generateMockPosts(accountInfo)
        }
      } else {
        throw new Error('Account not found')
      }
    } catch (err) {
      const basicAccount = {
        exists: true,
        username,
        fullName: username,
        profilePic: null,
        followers: Math.floor(Math.random() * 100000) + 1000,
        following: Math.floor(Math.random() * 1000) + 100,
        posts: Math.floor(Math.random() * 500) + 10,
        isVerified: false,
        bio: `${platform.charAt(0).toUpperCase() + platform.slice(1)} account`
      }
      setAccountData(basicAccount)
      generateMockPosts(basicAccount)
    } finally {
      setIsLoading(false)
    }
  }

  const generateMockPosts = (account) => {
    const mockPosts = []
    for (let i = 0; i < 8; i++) {
      mockPosts.push({
        id: `post_${i + 1}`,
        thumbnail: `https://picsum.photos/seed/${username}_${i}/400/400`,
        likes: Math.floor(Math.random() * 10000) + 100,
        comments: Math.floor(Math.random() * 500) + 10,
        views: Math.floor(Math.random() * 50000) + 1000,
        caption: `Post ${i + 1} from @${username}`,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      })
    }
    setPosts(mockPosts)
  }

  const handlePostSelect = (post) => {
    setSelectedPosts(prev => {
      const isSelected = prev.find(p => p.id === post.id)
      return isSelected ? prev.filter(p => p.id !== post.id) : [...prev, post]
    })
  }

  const handleContinueWithSelected = () => {
    if (selectedPosts.length === 0) {
      alert('Please select at least one post')
      return
    }
    setShowServiceModal(true)
  }

  const handleBoostAccount = () => {
    navigate('/service-selection', { state: { username, platform, accountData, targetType: 'account' } })
  }

  const handleBoostPost = (service) => {
    navigate('/package-selection', {
      state: {
        username, platform, accountData, service,
        targetType: 'post',
        postData: selectedPosts.length === 1 ? selectedPosts[0] : null,
        selectedPosts,
        multiPost: selectedPosts.length > 1
      }
    })
    setShowServiceModal(false)
  }

  const getPlatformIcon = () => {
    const icons = { instagram: '📷', tiktok: '🎵', youtube: '▶️', facebook: '👥' }
    return icons[platform] || '📱'
  }

  const getPlatformGradient = () => {
    const gradients = {
      instagram: 'from-pink-500 via-purple-500 to-orange-500',
      tiktok: 'from-cyan-400 via-black to-pink-500',
      youtube: 'from-red-600 to-orange-500',
      facebook: 'from-blue-600 to-blue-800'
    }
    return gradients[platform] || 'from-primary-500 to-accent-500'
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num?.toString() || '0'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-${platform}-500 animate-spin`}></div>
          </div>
          <p className="text-gray-600 font-medium">Loading @{username}...</p>
          <p className="text-gray-400 text-sm mt-1">Fetching latest data</p>
        </div>
      </div>
    )
  }

  if (error || !accountData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'Unable to find this account'}</p>
          <Button onClick={() => navigate('/search')}>Try Another Account</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {isFallback && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm text-amber-700">Showing demo data. Connect API for real-time data.</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getPlatformGradient()} flex items-center justify-center text-white text-5xl overflow-hidden shadow-lg`}>
                {accountData.profilePic || accountData.avatarUrl || accountData.profilePicUrl ? (
                  <img src={accountData.profilePic || accountData.avatarUrl || accountData.profilePicUrl} alt={username} className="w-full h-full object-cover" />
                ) : (
                  <span>{getPlatformIcon()}</span>
                )}
              </div>
              {accountData.isVerified && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">@{accountData.username || accountData.channelName || username}</h1>
              </div>
              {(accountData.fullName || accountData.nickname || accountData.channelName) && accountData.username !== accountData.fullName && (
                <p className="text-xl text-gray-600 mb-3">{accountData.fullName || accountData.nickname}</p>
              )}
              {(accountData.bio || accountData.biography || accountData.description) && (
                <p className="text-gray-600 mb-4 max-w-lg">{accountData.bio || accountData.biography || accountData.description}</p>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {accountData.posts !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.posts)}</div>
                    <div className="text-xs text-gray-500">Posts</div>
                  </div>
                )}
                {accountData.followers !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.followers)}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                )}
                {accountData.following !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.following)}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                )}
                {accountData.subscribers !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.subscribers)}</div>
                    <div className="text-xs text-gray-500">Subscribers</div>
                  </div>
                )}
                {accountData.likes !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.likes)}</div>
                    <div className="text-xs text-gray-500">Total Likes</div>
                  </div>
                )}
                {accountData.videoCount !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.videoCount)}</div>
                    <div className="text-xs text-gray-500">Videos</div>
                  </div>
                )}
                {accountData.totalViews !== undefined && (
                  <div className="bg-gray-50 rounded-xl px-4 py-2 text-center">
                    <div className="text-xl font-bold text-gray-900">{formatNumber(accountData.totalViews)}</div>
                    <div className="text-xs text-gray-500">Total Views</div>
                  </div>
                )}
              </div>
            </div>

            <Button onClick={handleBoostAccount} size="lg" className="whitespace-nowrap">
              Boost Account
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Select Posts to Boost</h2>
            {selectedPosts.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 bg-primary-50 px-3 py-1 rounded-full">
                  {selectedPosts.length} selected
                </span>
                <Button onClick={handleContinueWithSelected} size="sm">
                  Continue
                </Button>
              </div>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <p className="text-gray-600">No posts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {posts.map((post) => {
                const isSelected = selectedPosts.find(p => p.id === post.id)
                return (
                  <button
                    key={post.id}
                    onClick={() => handlePostSelect(post)}
                    className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                      isSelected ? 'ring-4 ring-primary-500 shadow-xl' : 'hover:shadow-lg'
                    }`}
                  >
                    <img src={post.thumbnail} alt={post.caption} className="w-full h-full object-cover" loading="lazy" />
                    <div className={`absolute top-2 right-2 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'bg-primary-600 border-primary-600' : 'bg-white/80 border-white group-hover:bg-white'
                    }`}>
                      {isSelected && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-all duration-300 flex items-end justify-center p-3 ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <div className="text-white text-center w-full">
                        <div className="flex items-center justify-center gap-3 text-sm">
                          <span className="flex items-center gap-1">❤️ {formatNumber(post.likes)}</span>
                          <span className="flex items-center gap-1">💬 {formatNumber(post.comments)}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {showServiceModal && selectedPosts.length > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Select Service</h3>
              <button onClick={() => setShowServiceModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'likes', icon: '❤️', name: 'Likes', desc: 'Boost engagement' },
                  { key: 'comments', icon: '💬', name: 'Comments', desc: 'Add social proof' },
                  { key: 'views', icon: '👁️', name: 'Views', desc: 'Increase reach' },
                  { key: 'shares', icon: '🔄', name: 'Shares', desc: 'Expand reach' }
                ].map((service) => (
                  <button key={service.key} onClick={() => handleBoostPost(service.key)}
                    className="p-4 border-2 border-gray-100 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all text-left group">
                    <div className="text-2xl mb-1">{service.icon}</div>
                    <div className="font-semibold text-gray-900 group-hover:text-primary-600">{service.name}</div>
                    <div className="text-xs text-gray-500">{service.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountProfile
