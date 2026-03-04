import { useNavigate } from 'react-router-dom'
import SectionWrapper from '../common/SectionWrapper'

const FreeTrial = () => {
  const navigate = useNavigate()
  const freeServices = [
    {
      title: 'TikTok Likes Generator',
      description: 'A TikTok likes generator is a free trial that helps users access quality and boost engagement with zero hidden fees.',
      icon: '❤️',
      buttonText: 'Generate Likes',
      gradient: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      title: 'TikTok Followers Generator',
      description: 'Start saving your time and see how the followers generator works for you. Indeed, this tool is used by many real people globally.',
      icon: '👥',
      buttonText: 'Generate Followers',
      gradient: 'from-cyan-400 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100'
    },
    {
      title: 'TikTok Views Generator',
      description: 'The higher the views, the higher get chance of getting popularity. Views will definitely improve your engagement rate.',
      icon: '👁️',
      buttonText: 'Generate Views',
      gradient: 'from-pink-400 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100'
    }
  ]

  return (
    <SectionWrapper background="gray" id="free-trial">
      {/* Background decorative elements */}
      <div className="bg-decoration bg-decoration-2 animate-float-slow"></div>
      <div className="bg-decoration bg-decoration-1 animate-pulse-slow animation-delay-2000"></div>
      <div className="bg-decoration bg-decoration-3 animate-drift animation-delay-4000"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Test it Free. Pay Nothing
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          You pay us for increasing your likes, views, followers, and more. We value that trust and your money, and so here's a chance to test our services before buying. Start your free trial today with zero hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
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
                  onClick={() => navigate('/free-trial')}
                  className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  {service.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-12 relative z-10">
        <p className="text-gray-600 mb-4">
          No credit card required • Instant access • 100% Free
        </p>
      </div>
    </SectionWrapper>
  )
}

export default FreeTrial
