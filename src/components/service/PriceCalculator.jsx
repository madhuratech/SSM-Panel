import { calculatePrice, formatPrice } from '../../utils/pricing'

function PriceCalculator({ platform, service, quantity }) {
  const price = calculatePrice(platform, service, quantity)

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Platform:</span>
          <span className="font-semibold text-gray-900 capitalize">{platform}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Service:</span>
          <span className="font-semibold text-gray-900 capitalize">{service}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-semibold text-gray-900">{quantity.toLocaleString()}</span>
        </div>
        
        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-primary-600">{formatPrice(price)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
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
  )
}

export default PriceCalculator
