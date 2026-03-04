import { API_BASE_URL } from '../config/api'

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }

    return data
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    // Store token in localStorage
    if (data.data.token) {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
    }

    return data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getProfile: async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get profile')
    }

    return data
  },

  updateProfile: async (userData) => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile')
    }

    // Update user in localStorage
    if (data.data) {
      localStorage.setItem('user', JSON.stringify(data.data))
    }

    return data
  },

  changePassword: async (passwords) => {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('No token found')
    }

    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(passwords)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to change password')
    }

    return data
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  },

  getToken: () => {
    return localStorage.getItem('token')
  },

  getUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}
