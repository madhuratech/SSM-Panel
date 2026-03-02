import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import ServiceCard from '../components/service/ServiceCard'
import QuantitySelector from '../components/service/QuantitySelector'
import PriceCalculator from '../components/service/PriceCalculator'
import Button from '../components/common/Button'

const Facebook = () => {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState('likes')
  const [quantity, setQuantity] = useState(1000)

  const services = [
    { id: 'likes', name: 'Likes', icon: '👍', description: 'Increase post engagement' },
    { id: 'followers', name: 'Followers', icon: '👥', description: 'Grow your page' },
    { id: 'views', name: 'Views', icon: '👁️', description: 'Boost video reach' },
    { id: 'comments', name: 'Comments', icon: '💬', description: 'Add social proof' }
  ]

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        platform: 'facebook',
        service: selectedService,
        quantity: quantity
      }
    })
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Facebook Growth Services
          </h1>
          <p className="text-lg text-gray-600">
            Increase your Facebook reach with real engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Service</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={selectedService === service.id}
                    onSelect={setSelectedService}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Quantity</h2>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            </div>
          </div>

          <div>
            <PriceCalculator
              platform="facebook"
              service={selectedService}
              quantity={quantity}
            />
            <Button
              fullWidth
              size="lg"
              onClick={handleCheckout}
              className="mt-4"
            >
              Continue to Checkout
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default Facebook
