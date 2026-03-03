import { useState, useEffect, useRef } from 'react'
import SectionWrapper from '../common/SectionWrapper'

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    customers: 0,
    orders: 0,
    followers: 0,
    sold: 0
  })

  const sectionRef = useRef(null)

  const stats = [
    { key: 'customers', label: 'Happy Customers', target: 50000, suffix: '+', color: 'from-blue-600 to-blue-500' },
    { key: 'orders', label: 'Orders Completed', target: 12500, suffix: '+', color: 'from-purple-600 to-purple-500' },
    { key: 'followers', label: 'Followers Delivered', target: 5000000, suffix: 'M+', color: 'from-pink-600 to-pink-500' },
    { key: 'sold', label: 'Services Sold', target: 250000, suffix: '+', color: 'from-indigo-600 to-indigo-500' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    stats.forEach((stat) => {
      let currentCount = 0
      const increment = stat.target / steps

      const timer = setInterval(() => {
        currentCount += increment
        if (currentCount >= stat.target) {
          currentCount = stat.target
          clearInterval(timer)
        }
        setCounts(prev => ({
          ...prev,
          [stat.key]: Math.floor(currentCount)
        }))
      }, interval)
    })
  }, [isVisible])

  const formatNumber = (num, key) => {
    if (key === 'followers') {
      return (num / 1000000).toFixed(1)
    }
    return num.toLocaleString()
  }

  return (
    <SectionWrapper background="gradient">
      <div ref={sectionRef} className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className="text-center transform transition-all duration-500 hover:scale-110"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {formatNumber(counts[stat.key], stat.key)}{stat.suffix}
              </div>
              <div className="text-gray-700 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Stats
