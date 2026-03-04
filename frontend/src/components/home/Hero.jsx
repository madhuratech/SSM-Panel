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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="text-center lg:text-left">
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
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fadeInUp animation-delay-200">
              Get real followers, likes, and views from authentic accounts. Instant delivery with guaranteed results and 24/7 support.
            </p>

            {/* CTA Buttons with animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fadeInUp animation-delay-400">
              <a href="/register">
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

            {/* Minimal trust badges */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fadeInUp animation-delay-600">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-fadeInRight hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Phone mockup */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-64 h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl p-3 animate-float">
                  {/* Phone screen */}
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    
                    {/* Social media icons floating */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Instagram icon */}
                        <div className="absolute top-20 left-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-200">
                          <span className="text-white text-2xl">📸</span>
                        </div>
                        
                        {/* TikTok icon */}
                        <div className="absolute top-32 right-8 w-12 h-12 bg-gradient-to-br from-cyan-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-400">
                          <span className="text-white text-2xl">🎵</span>
                        </div>
                        
                        {/* YouTube icon */}
                        <div className="absolute bottom-32 left-12 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-600">
                          <span className="text-white text-2xl">▶️</span>
                        </div>
                        
                        {/* Facebook icon */}
                        <div className="absolute bottom-20 right-12 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-float animation-delay-800">
                          <span className="text-white text-2xl">👥</span>
                        </div>

                        {/* Center profile illustration */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-6xl">👩‍💼</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phone notch */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-full"></div>
                </div>
              </div>

              {/* Floating hearts */}
              <div className="absolute top-10 right-20 text-4xl animate-float animation-delay-1000">❤️</div>
              <div className="absolute top-32 right-32 text-3xl animate-float animation-delay-1200">💜</div>
              <div className="absolute bottom-32 right-16 text-3xl animate-float animation-delay-1400">💙</div>
              <div className="absolute bottom-20 left-20 text-4xl animate-float animation-delay-1600">💖</div>
              
              {/* Floating likes/followers indicators */}
              <div className="absolute top-24 left-8 bg-white rounded-full px-4 py-2 shadow-lg animate-float animation-delay-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👍</span>
                  <span className="text-sm font-bold text-gray-800">+1.2K</span>
                </div>
              </div>
              
              <div className="absolute bottom-40 left-16 bg-white rounded-full px-4 py-2 shadow-lg animate-float animation-delay-1000">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="text-sm font-bold text-gray-800">+850</span>
                </div>
              </div>

              {/* Glow effects */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-300 to-accent-300 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
            </div>
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

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
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

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }

        .animation-delay-1400 {
          animation-delay: 1.4s;
        }

        .animation-delay-1600 {
          animation-delay: 1.6s;
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
