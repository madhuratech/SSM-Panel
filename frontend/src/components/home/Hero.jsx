import Button from '../common/Button'
import SectionWrapper from '../common/SectionWrapper'

const Hero = () => {
  const badges = [
    { 
      icon: '🔒', 
      text: 'SSL Encrypted',
      color: 'from-orange-400 to-orange-600',
      delay: '0s'
    },
    { 
      icon: '⚡', 
      text: 'Instant Delivery',
      color: 'from-yellow-400 to-yellow-600',
      delay: '0.1s'
    },
    { 
      icon: '🔄', 
      text: 'Refill Guarantee',
      color: 'from-blue-400 to-blue-600',
      delay: '0.2s'
    },
    { 
      icon: '✅', 
      text: 'No Password',
      color: 'from-green-400 to-green-600',
      delay: '0.3s'
    }
  ]

  return (
    <SectionWrapper background="gradient" className="pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated badge */}
          <div className="inline-block mb-6 animate-fadeInDown">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-primary-100">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  ✨ Trusted by 50,000+ Creators Worldwide
                </span>
              </div>
            </div>
          </div>
          
          {/* Main heading with animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
            Grow Your Social Media
            <span className="block mt-2 bg-gradient-to-r from-primary-600 via-accent-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Fast & Secure
            </span>
          </h1>
          
          {/* Subtitle with animation */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Get real followers, likes, and views from authentic accounts. Instant delivery with guaranteed results and 24/7 support.
          </p>

          {/* CTA Buttons with animation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeInUp animation-delay-400">
            <a href="#services">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Button>
            </a>
            <a href="#services">
              <Button variant="secondary" size="lg" className="group">
                <span className="group-hover:scale-110 inline-block transition-transform">View Pricing</span>
              </Button>
            </a>
          </div>

          {/* Feature badges with stagger animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="group animate-fadeInUp"
                style={{ animationDelay: badge.delay }}
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-200">
                  {/* Icon with gradient background */}
                  <div className="relative mb-3">
                    <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <span className="text-3xl filter drop-shadow-lg">{badge.icon}</span>
                    </div>
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  </div>
                  
                  <div className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                    {badge.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </SectionWrapper>
  )
}

export default Hero
