import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../components/common/SectionWrapper'

const FreeTrialPage = () => {
  const navigate = useNavigate()

  const freeServices = [
    {
      id: 'likes',
      title: 'TikTok Likes Generator',
      description: 'A TikTok likes generator is a free trial that helps users access quality and boost engagement with zero hidden fees.',
      icon: '❤️',
      buttonText: 'Generate Likes',
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      platform: 'tiktok'
    },
    {
      id: 'followers',
      title: 'TikTok Followers Generator',
      description: 'Start saving your time and see how the followers generator works for you. Indeed, this tool is used by many real people globally.',
      icon: '👥',
      buttonText: 'Generate Followers',
      gradient: 'from-cyan-400 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
      platform: 'tiktok'
    },
    {
      id: 'views',
      title: 'TikTok Views Generator',
      description: 'The higher the views, the higher get chance of getting popularity. Views will definitely improve your engagement rate.',
      icon: '👁️',
      buttonText: 'Generate Views',
      gradient: 'from-pink-400 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100',
      platform: 'tiktok'
    }
  ]

  const handleGenerateClick = (service) => {
    // Navigate to search account page with free trial flag
    navigate('/search', {
      state: {
        platform: service.platform,
        service: service.id,
        isFreeTrialMode: true
      }
    })
  }

  return (
    <SectionWrapper background="gray">
      <div className="max-w-6xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Test it Free. Pay Nothing
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            You pay us for increasing your likes, views, followers, and more. We value that trust and your money, and so here's a chance to test our services before buying. Start your free trial today with zero hidden fees.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-3 rounded-full font-semibold">
            <span className="text-xl">🎁</span>
            <span>Get 100 Free Coins to Try Any Service</span>
          </div>
        </div>

        {/* Free Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {freeServices.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-90`}></div>
              
              {/* Large "FREE" text in background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="text-9xl font-black text-white">FREE</span>
              </div>

              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-4xl">{service.icon}</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg min-h-[200px] flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm text-center mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => handleGenerateClick(service)}
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                  >
                    {service.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Free Trial Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Service</h3>
              <p className="text-sm text-gray-600">Select any free generator above</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enter Username</h3>
              <p className="text-sm text-gray-600">Verify your account</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Use Free Coins</h3>
              <p className="text-sm text-gray-600">Get 100 coins to try services</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">See Results</h3>
              <p className="text-sm text-gray-600">Experience instant delivery</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            No credit card required • Instant access • 100% Free
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Real Results</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default FreeTrialPage
