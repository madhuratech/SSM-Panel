import { useLocation, useNavigate } from 'react-router-dom'
import { calculatePrice, formatPrice } from '../utils/pricing'
import SectionWrapper from '../components/common/SectionWrapper'
import Button from '../components/common/Button'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const orderData = location.state

  if (!orderData) {
    navigate('/')
    return null
  }

  const { platform, service, quantity } = orderData
  const price = calculatePrice(platform, service, quantity)

  const handlePayment = () => {
    alert('Payment processing will be integrated with backend')
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Checkout
          </h1>
          <p className="text-lg text-gray-600">
            Review your order and complete payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Platform:</span>
                <span className="font-semibold text-gray-900 capitalize">{platform}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold text-gray-900 capitalize">{service}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold text-gray-900">{quantity.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-4 border-t-2">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-bold text-primary-600">{formatPrice(price)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant Delivery
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Safe & Secure
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Refill Guarantee
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile URL
                </label>
                <input
                  type="text"
                  placeholder={`Your ${platform} profile URL`}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={handlePayment}
            >
              Complete Payment
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By completing this purchase, you agree to our Terms of Service
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Checkout
