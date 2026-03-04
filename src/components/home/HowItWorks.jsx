import SectionWrapper from '../common/SectionWrapper'

const HowItWorks = () => {
  const steps = [
    {
      number: '1',
      title: 'Choose Your Platform',
      description: 'Select the social media platform you want to grow - TikTok, Instagram, Facebook, or YouTube.',
      icon: '🎯'
    },
    {
      number: '2',
      title: 'Select Service & Quantity',
      description: 'Pick the service type (followers, likes, views) and enter the quantity you need.',
      icon: '📊'
    },
    {
      number: '3',
      title: 'Complete Payment',
      description: 'Securely checkout with our SSL-encrypted payment system. No password required.',
      icon: '💳'
    },
    {
      number: '4',
      title: 'Get Instant Results',
      description: 'Watch your engagement grow immediately with real accounts and guaranteed delivery.',
      icon: '🚀'
    }
  ]

  return (
    <SectionWrapper background="white">
      {/* Background decorative elements */}
      <div className="bg-decoration bg-decoration-1 animate-drift"></div>
      <div className="bg-decoration bg-decoration-3 animate-float animation-delay-2000"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get started in just 4 simple steps. We handle everything to ensure your social media success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Number Badge */}
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Arrow between steps (desktop only) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 z-10 overflow-visible">
                {/* Static arrow */}
                <svg className="w-8 h-8 text-primary-300 absolute top-1/2 left-0 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {/* Animated arrow */}
                <svg className="w-8 h-8 text-primary-600 absolute top-1/2 left-0 animate-arrow-slide" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export default HowItWorks
