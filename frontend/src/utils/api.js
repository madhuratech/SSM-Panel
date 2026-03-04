import { API_BASE_URL } from '../config/api'

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Order API calls
export const orderAPI = {
  create: async (orderData) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  },

  getById: async (orderId) => {
    return apiRequest(`/orders/${orderId}`)
  },

  getByEmail: async (email) => {
    return apiRequest(`/orders/user/${email}`)
  },

  updateStatus: async (orderId, statusData) => {
    return apiRequest(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData)
    })
  }
}

// Service API calls
export const serviceAPI = {
  getAll: async (platform = null) => {
    const query = platform ? `?platform=${platform}` : ''
    return apiRequest(`/services${query}`)
  },

  getOne: async (platform, service) => {
    return apiRequest(`/services/${platform}/${service}`)
  }
}

// User API calls
export const userAPI = {
  getByEmail: async (email) => {
    return apiRequest(`/users/${email}`)
  },

  create: async (userData) => {
    return apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }
}

// Payment API calls
export const paymentAPI = {
  process: async (paymentData) => {
    return apiRequest('/payments/process', {
      method: 'POST',
      body: JSON.stringify(paymentData)
    })
  },

  verify: async (transactionId) => {
    return apiRequest(`/payments/verify/${transactionId}`)
  }
}

// Health check
export const healthCheck = async () => {
  return apiRequest('/health')
}
