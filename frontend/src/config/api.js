// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// API endpoints
export const API_ENDPOINTS = {
  // Orders
  createOrder: '/orders',
  getOrder: (orderId) => `/orders/${orderId}`,
  getUserOrders: (email) => `/orders/user/${email}`,
  updateOrderStatus: (orderId) => `/orders/${orderId}/status`,
  
  // Services
  getServices: '/services',
  getService: (platform, service) => `/services/${platform}/${service}`,
  
  // Users
  getUser: (email) => `/users/${email}`,
  createUser: '/users',
  
  // Payments
  processPayment: '/payments/process',
  verifyPayment: (transactionId) => `/payments/verify/${transactionId}`,
  
  // Health
  health: '/health'
}
