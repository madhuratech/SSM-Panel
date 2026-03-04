import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import { orderAPI } from '../utils/api'

const PaymentProcessing = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderId, username, platform, service, quantity, price, email, transactionId } = location.state || {}
  
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('processing')

  useEffect(() => {
    if (!orderId) {
      navigate('/')
      return
    }

    // Simulate payment processing and update order status
    const processOrder = async () => {
      try {
        // Update order status to processing
        await orderAPI.updateStatus(orderId, {
          status: 'processing',
          progress: 0
        })

        // Simulate progress updates
        const interval = setInterval(async () => {
          setProgress((prev) => {
            const newProgress = prev + 10
            
            // Update backend with progress
            if (newProgress <= 100) {
              orderAPI.updateStatus(orderId, {
                status: newProgress === 100 ? 'delivering' : 'processing',
                progress: newProgress
              }).catch(console.error)
            }

            if (newProgress >= 100) {
              clearInterval(interval)
              setStatus('complete')
              
              // Navigate to order complete after a delay
              setTimeout(() => {
                navigate('/order-complete', { 
                  state: { 
                    orderId,
                    username, 
                    platform, 
                    service, 
                    quantity, 
                    price, 
                    email,
                    transactionId
                  } 
                })
              }, 1500)
              return 100
            }
            
            return newProgress
          })
        }, 300)

        return () => clearInterval(interval)
      } catch (error) {
        console.error('Failed to process order:', error)
        alert('Payment processing failed. Please contact support.')
      }
    }

    processOrder()
  }, [orderId, navigate, username, platform, service, quantity, price, email, transactionId])

  return (
    <SectionWrapper background="gradient">
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full text-center">
          {/* Animated Spinner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
            <div 
              className="absolute inset-0 border-8 border-primary-600 rounded-full border-t-transparent animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">{progress}%</span>
            </div>
          </div>

          {/* Status Text */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {status === 'processing' ? 'Almost done' : 'Payment Complete!'}
          </h2>
          <p className="text-gray-600 mb-6">
            {status === 'processing' 
              ? `Hold on, fetching your data! •••`
              : 'Your order has been confirmed'}
          </p>

          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="text-sm text-gray-600 mb-1">Processing order for</div>
            <div className="font-bold text-gray-900">@{username}</div>
            <div className="text-sm text-gray-600 capitalize">{quantity.toLocaleString()} {service}</div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Please do not close this window
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default PaymentProcessing
