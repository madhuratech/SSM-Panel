import { useLocation, useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import { formatPrice } from '../utils/pricing'

const OrderComplete = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orderId, username, platform, service, quantity, price, email, transactionId } = location.state || {}

  return (
    <SectionWrapper background="gradient">
      <div className="max-w-2xl mx-auto py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Order Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Your {service} are being delivered to <span className="font-semibold text-primary-600">@{username}</span>
          </p>

          {/* Order Details Card */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <span className="text-sm text-gray-600">Order ID</span>
              <span className="font-mono font-semibold text-gray-900">{orderId}</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Platform:</span>
                <span className="font-semibold capitalize">{platform}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold capitalize">{service}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{quantity.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold">{email}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="font-bold text-gray-900">Total Paid:</span>
                <span className="font-bold text-xl text-primary-600">{formatPrice(price)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-blue-900 mb-1">Delivery in Progress</h3>
                <p className="text-sm text-blue-800">
                  Your order will be delivered within 5-30 minutes. You'll receive an email confirmation shortly.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Place Another Order
            </button>
            <button
              onClick={() => navigate('/track-order', { state: { orderId, username, platform, service, quantity } })}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Track Order
            </button>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-2">
              Need help? Contact our 24/7 support
            </p>
            <a href="mailto:support@socialboost.com" className="text-primary-600 hover:underline font-medium">
              support@socialboost.com
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default OrderComplete
