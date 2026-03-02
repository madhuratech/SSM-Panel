import SectionWrapper from '../common/SectionWrapper'

const Features = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Instant Delivery',
      description: 'Start seeing results within minutes. No waiting, no delays.'
    },
    {
      icon: '🔒',
      title: '100% Safe & Secure',
      description: 'SSL-encrypted checkout. Your account stays completely safe.'
    },
    {
      icon: '🎯',
      title: 'Real Engagement',
      description: 'All followers and likes come from authentic accounts.'
    },
    {
      icon: '🔄',
      title: 'Refill Guarantee',
      description: 'Up to 6-month refill protection on all packages.'
    },
    {
      icon: '📈',
      title: 'Algorithm Boost',
      description: 'Optimized delivery that increases organic reach.'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our team is always available to help you succeed.'
    }
  ]

  return (
    <SectionWrapper background="gray">
      {/* Background decorative elements */}
      <div className="bg-decoration bg-decoration-1 animate-float"></div>
      <div className="bg-decoration bg-decoration-2 animate-drift animation-delay-2000"></div>
      <div className="bg-decoration bg-decoration-3 animate-pulse-slow animation-delay-1000"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We combine safety, speed, and quality for the best experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export default Features
