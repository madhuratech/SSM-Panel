import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'
import ServiceCard from '../components/service/ServiceCard'
import Button from '../components/common/Button'

const FreeTrialService = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { username, platform, service: initialService } = location.state || {}
  
  const [selectedService, setSelectedService] = useState(initialService || 'likes')
  const [freeCoins] = useState(100)
  const [usedCoins, setUsedCoins] = useState(0)

  const services = [
    { id: 'views', name: 'Views', icon: '👁️', description: 'Boost video visibility', coinCost: 10 },
    { id: 'followers', name: 'Followers', icon: '👥', description: 'Grow your audience', coinCost: 20 },
    { id: 'likes', name: 'Likes', icon: '❤️', description: 'Increase engagement', coinCost: 5 },
    { id: 'comments', name: 'Comments', icon: '💬', description: 'Add social proof', coinCost: 15 }
  ]

  const selectedServiceData = services.find(s => s.id === selectedService)
  const remainingCoins = freeCoins - usedCoins
  const canAfford = remainingCoins >= (selectedServiceData?.coinCost || 0)

  const handleUseFreeService = () => {
    if (!canAfford) {
      alert('Not enough coins! Upgrade to paid service to continue.')
      navigate(`/${platform}`, { state: { username, selectedService } })
      return
    }

    // Simulate using the service
    setUsedCoins(usedCoins + selectedServiceData.coinCost)
    alert(`Success! You've used ${selectedServiceData.coinCost} coins for ${selectedServiceData.name}. Remaining: ${remainingCoins - selectedServiceData.coinCost} coins`)
  }

  const handleUpgradeToPaid = () => {
    navigate(`/${platform}`, {
      state: {
        username,
        selectedService,
        accountVerified: true
      }
    })
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-6xl mx-auto">
        {/* Header with Coin Balance */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg mb-4">
            <span className="text-3xl">🪙</span>
            <div className="text-left">
              <div className="text-sm font-medium opacity-90">Free Trial Coins</div>
              <div className="text-2xl font-bold">{remainingCoins} / {freeCoins}</div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Try {platform?.charAt(0).toUpperCase() + platform?.slice(1)} Services Free
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Account: <span className="font-semibold text-primary-600">@{username}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Free Service</h2>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedService === service.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <div className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{service.icon}</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
                        <span>🪙</span>
                        <span>{service.coinCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Trial Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span>ℹ️</span>
                <span>Free Trial Limitations</span>
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Limited to 100 free coins per account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Each service costs different amounts of coins</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Upgrade to paid service for unlimited access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Results delivered instantly</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-semibold capitalize">{platform}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">{selectedServiceData?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-semibold text-yellow-600">🪙 {selectedServiceData?.coinCost} coins</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Remaining:</span>
                  <span className="font-bold text-lg text-primary-600">
                    🪙 {canAfford ? remainingCoins - selectedServiceData.coinCost : remainingCoins}
                  </span>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleUseFreeService}
                disabled={!canAfford}
                className="mb-3"
              >
                {canAfford ? 'Use Free Service' : 'Not Enough Coins'}
              </Button>

              <button
                onClick={handleUpgradeToPaid}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Upgrade to Paid Service
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Get unlimited access with paid plans
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default FreeTrialService
