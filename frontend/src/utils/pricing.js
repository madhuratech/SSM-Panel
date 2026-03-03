// Pricing configuration for all platforms and services
export const PRICING = {
  tiktok: {
    views: { base: 50, per1000: 50 },
    followers: { base: 100, per1000: 100 },
    likes: { base: 40, per1000: 40 },
    comments: { base: 150, per1000: 150 }
  },
  instagram: {
    views: { base: 45, per1000: 45 },
    followers: { base: 95, per1000: 95 },
    likes: { base: 35, per1000: 35 },
    comments: { base: 140, per1000: 140 }
  },
  facebook: {
    views: { base: 40, per1000: 40 },
    followers: { base: 90, per1000: 90 },
    likes: { base: 30, per1000: 30 },
    comments: { base: 130, per1000: 130 }
  },
  youtube: {
    views: { base: 60, per1000: 60 },
    subscribers: { base: 120, per1000: 120 },
    likes: { base: 50, per1000: 50 },
    comments: { base: 160, per1000: 160 }
  }
}

// Calculate price based on platform, service, and quantity
export function calculatePrice(platform, service, quantity) {
  const pricing = PRICING[platform]?.[service]
  if (!pricing) return 0
  
  const units = Math.ceil(quantity / 1000)
  return units * pricing.per1000
}

// Format price for display
export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`
}
