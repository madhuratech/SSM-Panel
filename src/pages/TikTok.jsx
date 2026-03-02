import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import ServiceCard from '../components/service/ServiceCard'
import QuantitySelector from '../components/service/QuantitySelector'
import PriceCalculator from '../components/service/PriceCalculator'
import Button from '../components/common/Button'

const TikTok = () => {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState('views')
  const [quantity, setQuantity] = useState(1000)

  const services = [
    { id: 'views', name: 'Views', icon: '👁️', description: 'Boost video visibility' },
    { id: 'followers', name: 'Followers', icon: '👥', description: 'Grow your audience' },
    { id: 'likes', name: 'Likes', icon: '❤️', description: 'Increase engagement' },
    { id: 'comments', name: 'Comments', icon: '💬', description: 'Add social proof' }
  ]

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        platform: 'tiktok',
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
            TikTok Growth Services
          </h1>
          <p className="text-lg text-gray-600">
            Choose your service and boost your TikTok presence
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
              platform="tiktok"
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

export default TikTok
