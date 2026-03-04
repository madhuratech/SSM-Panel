import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import { calculatePrice, formatPrice } from '../utils/pricing'

const PackageSelection = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, service, accountData, targetType, postData } = location.state || {}
  
  const [quantity, setQuantity] = useState(1000)

  const packages = {
    views: [
      { value: 1000, label: '1K' },
      { value: 2500, label: '2.5K' },
      { value: 5000, label: '5K' },
      { value: 10000, label: '10K' }
    ],
    followers: [
      { value: 250, label: '250' },
      { value: 500, label: '500' },
      { value: 1000, label: '1K' },
      { value: 2500, label: '2.5K' }
    ],
    likes: [
      { value: 500, label: '500' },
      { value: 1000, label: '1K' },
      { value: 2500, label: '2.5K' },
      { value: 5000, label: '5K' }
    ],
    comments: [
      { value: 50, label: '50' },
      { value: 100, label: '100' },
      { value: 250, label: '250' },
      { value: 500, label: '500' }
    ]
  }

  const currentPackages = packages[service] || packages.views
  const price = calculatePrice(platform, service, quantity)
  const discount = quantity >= 5000 ? 0.15 : quantity >= 2500 ? 0.10 : 0
  const discountedPrice = price * (1 - discount)

  const handleContinue = () => {
    navigate('/order-summary', {
      state: {
        username,
        platform,
        service,
        quantity,
        price: discountedPrice,
        originalPrice: price,
        discount,
        accountData,
        targetType,
        postData
      }
    })
  }

  return (
    <SectionWrapper background="gradient">
      <div className="max-w-5xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-white px-6 py-2 rounded-full shadow-md mb-4">
            <span className="text-sm text-gray-600">Step 2 of 3</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {platform?.charAt(0).toUpperCase() + platform?.slice(1)} Boost - Pick Package
          </h1>
          <p className="text-lg text-gray-600">
            Slide to select your desired {service} package
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Package Slider */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 capitalize">{service}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                      {quantity.toLocaleString()}
                    </span>
                    {discount > 0 && (
                      <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                        HOT SALE
                      </span>
                    )}
                  </div>
                </div>

                {/* Slider */}
                <div className="relative pt-6 pb-8">
                  <input
                    type="range"
                    min={currentPackages[0].value}
                    max={currentPackages[currentPackages.length - 1].value}
                    step={currentPackages[0].value}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-primary-200 to-accent-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  
                  {/* Slider Labels */}
                  <div className="flex justify-between mt-4">
                    {currentPackages.map((pkg) => (
                      <button
                        key={pkg.value}
                        onClick={() => setQuantity(pkg.value)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          quantity === pkg.value
                            ? 'bg-primary-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {pkg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total Price</div>
                      {discount > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(price)}
                        </div>
                      )}
                      <div className="text-3xl font-bold text-gray-900">
                        {formatPrice(discountedPrice)}
                      </div>
                    </div>
                    {discount > 0 && (
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                        Save {(discount * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>
                  {discount > 0 && (
                    <div className="mt-3 text-sm text-green-700 font-medium">
                      (Discount {formatPrice(price - discountedPrice)})
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-semibold capitalize">{platform}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Username:</span>
                  <span className="font-semibold">@{username}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold capitalize">{service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-semibold">{quantity.toLocaleString()}</span>
                </div>
                
                <div className="border-t pt-4">
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Original Price:</span>
                      <span className="line-through">{formatPrice(price)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-2xl text-primary-600">
                      {formatPrice(discountedPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Continue
              </button>

              {discount < 0.15 && (
                <p className="text-xs text-center text-gray-500 mt-4">
                  Add {formatPrice((currentPackages[currentPackages.length - 1].value - quantity) * (price / quantity))} more to get {discount === 0.10 ? '15%' : '10%'} off
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </SectionWrapper>
  )
}

export default PackageSelection
