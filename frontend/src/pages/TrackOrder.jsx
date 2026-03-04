import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import { orderAPI } from '../utils/api'

const TrackOrder = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId: initialOrderId, username, platform, service, quantity } = location.state || {}
  
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(25)
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  const steps = [
    {
      id: 1,
      title: 'Order Confirmed',
      description: 'Your order has been received',
      icon: '✓',
      time: 'Just now',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Processing',
      description: 'Preparing your order for delivery',
      icon: '⚙️',
      time: 'In progress',
      status: currentStep >= 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'Delivering',
      description: `Sending ${service} to @${username}`,
      icon: '🚀',
      time: currentStep >= 3 ? 'In progress' : 'Pending',
      status: currentStep >= 3 ? 'completed' : 'pending'
    },
    {
      id: 4,
      title: 'Completed',
      description: 'Order successfully delivered',
      icon: '🎉',
      time: currentStep >= 4 ? 'Completed' : 'Pending',
      status: currentStep >= 4 ? 'completed' : 'pending'
    }
  ]

  useEffect(() => {
    // Fetch order data from backend
    const fetchOrderData = async () => {
      if (initialOrderId) {
        try {
          const response = await orderAPI.getById(initialOrderId)
          if (response.success) {
            setOrderData(response.data)
            setProgress(response.data.progress || 25)
            
            // Set current step based on order status
            const statusMap = {
              'confirmed': 1,
              'processing': 2,
              'delivering': 3,
              'completed': 4
            }
            setCurrentStep(statusMap[response.data.status] || 1)
          }
        } catch (error) {
          console.error('Failed to fetch order:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchOrderData()

    // Simulate order progress (for demo purposes)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval)
          return 4
        }
        return prev + 1
      })
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 25
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!orderId) {
    return (
      <SectionWrapper background="gray">
        <div className="max-w-2xl mx-auto py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-6">Please place an order first</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            Go to Home
          </button>
        </div>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Order ID: <span className="font-mono font-semibold text-primary-600">{orderId}</span>
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentStep === 4 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {currentStep === 4 ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Platform</div>
              <div className="font-semibold capitalize">{platform}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Username</div>
              <div className="font-semibold">@{username}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Service</div>
              <div className="font-semibold capitalize">{service}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Quantity</div>
              <div className="font-semibold">{quantity?.toLocaleString()}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-primary-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Order Timeline</h2>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div 
              className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-primary-600 to-accent-600 transition-all duration-1000"
              style={{ height: `${(currentStep - 1) * 33.33}%` }}
            ></div>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.id} className="relative flex items-start gap-6">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 ${
                    step.status === 'completed'
                      ? 'bg-gradient-to-br from-primary-600 to-accent-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.status === 'completed' ? '✓' : step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-lg font-bold ${
                        step.status === 'completed' ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-sm font-medium ${
                        step.status === 'completed' ? 'text-primary-600' : 'text-gray-400'
                      }`}>
                        {step.time}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      step.status === 'completed' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>

                    {/* Animated pulse for current step */}
                    {step.id === currentStep && currentStep < 4 && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-primary-600">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></span>
                          <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                        <span className="font-medium">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Place Another Order
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Order Details
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help with your order?
          </p>
          <a href="mailto:support@socialboost.com" className="text-primary-600 hover:underline font-medium">
            Contact Support
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default TrackOrder
