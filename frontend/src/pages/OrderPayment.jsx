import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import { formatPrice } from '../utils/pricing'
import { orderAPI, paymentAPI } from '../utils/api'
import { authAPI } from '../utils/auth'

const OrderPayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, service, quantity, price, originalPrice, discount, accountData, targetType, postData } = location.state || {}
  
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  // Auto-fill email from logged-in user
  useEffect(() => {
    const user = authAPI.getUser()
    if (user && user.email) {
      setEmail(user.email)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!agreedToTerms) {
      setError('Please agree to the terms of service')
      return
    }

    if (!email) {
      setError('Please provide an email address')
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Get user token if logged in
      const token = authAPI.getToken()
      
      // Create order in backend
      const orderResponse = await orderAPI.create({
        email,
        platform,
        service,
        username,
        quantity,
        price,
        paymentMethod,
        targetType,
        postId: postData?.id
      })

      if (orderResponse.success) {
        // Process payment
        const paymentResponse = await paymentAPI.process({
          orderId: orderResponse.data.orderId,
          paymentMethod,
          amount: price
        })

        if (paymentResponse.success) {
          // Navigate to payment processing with order data
          navigate('/payment-processing', {
            state: {
              orderId: orderResponse.data.orderId,
              username,
              platform,
              service,
              quantity,
              price,
              email,
              paymentMethod,
              transactionId: paymentResponse.data.transactionId
            }
          })
        } else {
          setError(paymentResponse.message || 'Payment processing failed. Please try again.')
          setIsProcessing(false)
        }
      } else {
        setError(orderResponse.message || 'Failed to create order. Please try again.')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Order creation failed:', error)
      setError(error.message || 'Failed to create order. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <span className="text-sm text-gray-600">Step 3 of 3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Submit Payment
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details Sidebar */}
          <div className="lg:order-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Details</h3>
              
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">@{username}</div>
                    <div className="text-sm text-gray-600 capitalize">{platform}</div>
                  </div>
                </div>
                {targetType === 'post' && postData && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-600 mb-2">Boosting specific post:</div>
                    <div className="flex gap-2">
                      <img
                        src={postData.thumbnail}
                        alt="Post"
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1 text-xs">
                        <div className="text-gray-600">❤️ {postData.likes?.toLocaleString()}</div>
                        <div className="text-gray-600">💬 {postData.comments?.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{service}</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal:</span>
                      <span className="line-through">{formatPrice(originalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({(discount * 100).toFixed(0)}%):</span>
                      <span>-{formatPrice(originalPrice - price)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">{formatPrice(price)}</span>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 lg:order-1">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              {/* Email Address */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="de@gmail.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We'll send your order confirmation here
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Payment Method
                </label>
                
                <div className="space-y-3">
                  {/* Card Payment */}
                  <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary-300">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-600"
                      />
                      <span className="font-medium text-gray-900">Card / Apple Pay / GPay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    </div>
                  </label>

                  {/* Crypto Payment */}
                  <label className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-primary-300">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="crypto"
                        checked={paymentMethod === 'crypto'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-primary-600"
                      />
                      <span className="font-medium text-gray-900">Cryptocurrency</span>
                    </div>
                    <span className="text-sm text-gray-600">BTC, ETH, USDT</span>
                  </label>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 text-primary-600 mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="/terms" className="text-primary-600 hover:underline font-medium">
                      terms of service
                    </a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-primary-600 hover:underline font-medium">
                      privacy policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!agreedToTerms || isProcessing}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Your information is securely encrypted and processed with advanced protection.
              </p>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default OrderPayment
