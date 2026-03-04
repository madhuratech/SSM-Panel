import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'

const ServiceSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, accountData, targetType } = location.state || {}
  
  const [selectedService, setSelectedService] = useState(null)

  const services = [
    { 
      id: 'views', 
      name: 'Views', 
      icon: '👁️', 
      description: 'Boost video visibility',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'followers', 
      name: 'Followers', 
      icon: '👥', 
      description: 'Grow your audience',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'likes', 
      name: 'Likes', 
      icon: '❤️', 
      description: 'Increase engagement',
      color: 'from-red-500 to-pink-500'
    },
    { 
      id: 'comments', 
      name: 'Comments', 
      icon: '💬', 
      description: 'Add social proof',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const handleContinue = () => {
    if (!selectedService) {
      alert('Please select a service')
      return
    }

    navigate('/package-selection', {
      state: {
        username,
        platform,
        accountData,
        service: selectedService,
        targetType: targetType || 'account'
      }
    })
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Select Service
          </h1>
          <p className="text-lg text-gray-600">
            Choose the service you want for <span className="font-semibold text-primary-600">@{username}</span>
          </p>
          {targetType === 'account' && (
            <p className="text-sm text-gray-500 mt-2">Boosting entire account</p>
          )}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`relative p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 text-left ${
                selectedService === service.id
                  ? 'bg-white shadow-2xl ring-4 ring-primary-500'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Selected Checkmark */}
              {selectedService === service.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Icon with gradient */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                {service.icon}
              </div>

              {/* Service Info */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedService}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Continue to Packages
        </button>
      </div>
    </SectionWrapper>
  )
}

export default ServiceSelection
