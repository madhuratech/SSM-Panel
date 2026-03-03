import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import ServiceCard from '../components/service/ServiceCard'
import QuantitySelector from '../components/service/QuantitySelector'
import PriceCalculator from '../components/service/PriceCalculator'
import Button from '../components/common/Button'

const YouTube = () => {
  const navigate = useNavigate()
  const [selectedService, setSelectedService] = useState('views')
  const [quantity, setQuantity] = useState(1000)

  const services = [
    { id: 'views', name: 'Views', icon: '👁️', description: 'Boost video visibility' },
    { id: 'subscribers', name: 'Subscribers', icon: '👥', description: 'Grow your channel' },
    { id: 'likes', name: 'Likes', icon: '👍', description: 'Increase engagement' },
    { id: 'comments', name: 'Comments', icon: '💬', description: 'Add authenticity' }
  ]

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        platform: 'youtube',
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
            YouTube Growth Services
          </h1>
          <p className="text-lg text-gray-600">
            Grow your YouTube channel with real engagement
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
              platform="youtube"
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

export default YouTube
