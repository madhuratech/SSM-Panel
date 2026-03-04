import { API_BASE_URL } from '../config/api'

const generateFallbackPosts = (username, platform, count = 8) => {
  const posts = []
  for (let i = 0; i < count; i++) {
    posts.push({
      id: `post_${i + 1}`,
      thumbnail: `https://picsum.photos/seed/${username}_${i}/400/400`,
      likes: Math.floor(Math.random() * 10000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      views: Math.floor(Math.random() * 50000) + 1000,
      caption: `Post ${i + 1} from @${username}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      platform
    })
  }
  return posts
}

const generateFallbackAccount = (username, platform) => {
  return {
    exists: true,
    username,
    fullName: username,
    profilePic: null,
    followers: Math.floor(Math.random() * 100000) + 1000,
    following: Math.floor(Math.random() * 1000) + 100,
    posts: Math.floor(Math.random() * 500) + 10,
    isVerified: Math.random() > 0.7,
    bio: `${platform.charAt(0).toUpperCase() + platform.slice(1)} account`,
    platform,
    fetchedAt: new Date().toISOString()
  }
}

export const socialMediaAPI = {
  verifyAccount: async (platform, username) => {
    try {
      const response = await fetch(`${API_BASE_URL}/social/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, username })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        return { success: true, data: data.data }
      }
      
      return { 
        success: false, 
        data: generateFallbackAccount(username, platform),
        isFallback: true,
        message: data.message || 'Using demo data'
      }
    } catch (error) {
      console.warn('API unavailable, using fallback data')
      return {
        success: false,
        data: generateFallbackAccount(username, platform),
        isFallback: true,
        message: 'Demo mode - API not connected'
      }
    }
  },

  quickVerify: async (platform, username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/verify/${platform}/${encodeURIComponent(username)}`
      )
      const data = await response.json()
      return response.ok ? { success: true, ...data } : { success: false, data: generateFallbackAccount(username, platform), isFallback: true }
    } catch (error) {
      return { success: false, data: generateFallbackAccount(username, platform), isFallback: true }
    }
  },

  fetchPosts: async (platform, username, limit = 12) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/posts/${platform}/${encodeURIComponent(username)}?limit=${limit}`
      )
      const data = await response.json()
      
      if (response.ok && data.success && data.data?.posts?.length > 0) {
        return { success: true, data: data.data }
      }
      
      return {
        success: false,
        data: { posts: generateFallbackPosts(username, platform, limit) },
        isFallback: true
      }
    } catch (error) {
      return {
        success: false,
        data: { posts: generateFallbackPosts(username, platform, limit) },
        isFallback: true
      }
    }
  },

  fetchYouTubeChannel: async (channelIdOrUsername) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/youtube/channel/${encodeURIComponent(channelIdOrUsername)}`
      )
      const data = await response.json()
      
      if (response.ok && data.success) {
        return { success: true, data: data.data }
      }
      
      return {
        success: false,
        data: {
          ...generateFallbackAccount(channelIdOrUsername, 'youtube'),
          channelId: channelIdOrUsername,
          channelName: channelIdOrUsername,
          subscribers: Math.floor(Math.random() * 500000) + 1000,
          totalViews: Math.floor(Math.random() * 10000000) + 100000,
          videoCount: Math.floor(Math.random() * 200) + 10,
          isVerified: Math.random() > 0.5,
          description: `Official YouTube channel - ${channelIdOrUsername}`,
          bannerUrl: null,
          avatarUrl: null
        },
        isFallback: true
      }
    } catch (error) {
      return {
        success: false,
        data: {
          ...generateFallbackAccount(channelIdOrUsername, 'youtube'),
          channelId: channelIdOrUsername,
          channelName: channelIdOrUsername,
          subscribers: Math.floor(Math.random() * 500000) + 1000,
          totalViews: Math.floor(Math.random() * 10000000) + 100000,
          videoCount: Math.floor(Math.random() * 200) + 10,
          isVerified: Math.random() > 0.5,
          description: `Official YouTube channel - ${channelIdOrUsername}`
        },
        isFallback: true
      }
    }
  },

  fetchInstagramProfile: async (username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/instagram/profile/${encodeURIComponent(username)}`
      )
      const data = await response.json()
      
      if (response.ok && data.success) {
        return { success: true, data: data.data }
      }
      
      return {
        success: false,
        data: {
          ...generateFallbackAccount(username, 'instagram'),
          username,
          fullName: username,
          followers: Math.floor(Math.random() * 100000) + 500,
          following: Math.floor(Math.random() * 500) + 50,
          posts: Math.floor(Math.random() * 500) + 20,
          isBusiness: Math.random() > 0.5,
          isVerified: Math.random() > 0.7,
          biography: `Instagram user - ${username}`,
          externalUrl: null,
          profilePicUrl: null,
          profilePicUrlHD: null
        },
        isFallback: true
      }
    } catch (error) {
      return {
        success: false,
        data: {
          ...generateFallbackAccount(username, 'instagram'),
          username,
          fullName: username,
          followers: Math.floor(Math.random() * 100000) + 500,
          following: Math.floor(Math.random() * 500) + 50,
          posts: Math.floor(Math.random() * 500) + 20,
          isBusiness: Math.random() > 0.5,
          isVerified: Math.random() > 0.7,
          biography: `Instagram user - ${username}`
        },
        isFallback: true
      }
    }
  },

  fetchTikTokProfile: async (username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/tiktok/profile/${encodeURIComponent(username)}`
      )
      const data = await response.json()
      
      if (response.ok && data.success) {
        return { success: true, data: data.data }
      }
      
      return {
        success: false,
        data: {
          ...generateFallbackAccount(username, 'tiktok'),
          username,
          nickname: username,
          followers: Math.floor(Math.random() * 500000) + 1000,
          following: Math.floor(Math.random() * 1000) + 100,
          likes: Math.floor(Math.random() * 5000000) + 10000,
          videoCount: Math.floor(Math.random() * 300) + 10,
          isVerified: Math.random() > 0.6,
          bio: `TikTok creator - @${username}`,
          avatarUrl: null
        },
        isFallback: true
      }
    } catch (error) {
      return {
        success: false,
        data: {
          ...generateFallbackAccount(username, 'tiktok'),
          username,
          nickname: username,
          followers: Math.floor(Math.random() * 500000) + 1000,
          following: Math.floor(Math.random() * 1000) + 100,
          likes: Math.floor(Math.random() * 5000000) + 10000,
          videoCount: Math.floor(Math.random() * 300) + 10,
          isVerified: Math.random() > 0.6,
          bio: `TikTok creator - @${username}`
        },
        isFallback: true
      }
    }
  }
}
