import { useEffect, useRef } from 'react'
import SectionWrapper from '../common/SectionWrapper'

const Testimonials = () => {
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId
    let isPaused = false
    const scrollSpeed = 0.5 // pixels per frame

    const smoothScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed

        // When we reach the middle (where duplicates start), reset to beginning
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll)
    }

    const handleMouseEnter = () => {
      isPaused = true
    }

    const handleMouseLeave = () => {
      isPaused = false
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    animationFrameId = requestAnimationFrame(smoothScroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Content Creator',
      rating: 5,
      text: 'My engagement tripled within the first month. The followers are real and my content finally gets the visibility it deserves.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      gradient: 'from-pink-400 to-purple-500'
    },
    {
      name: 'James T.',
      role: 'Fitness Influencer',
      rating: 5,
      text: 'This service unlocked brand deals for me. The growth was natural and my engagement rate improved significantly.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Emily R.',
      role: 'Fashion Blogger',
      rating: 5,
      text: 'Safe, fast, and effective. I was skeptical at first but the results speak for themselves. Highly recommend!',
      avatar: 'https://i.pravatar.cc/150?img=9',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Michael K.',
      role: 'Travel Vlogger',
      rating: 5,
      text: 'Amazing service! My YouTube channel grew exponentially. The subscribers are genuine and actively engage with my content.',
      avatar: 'https://i.pravatar.cc/150?img=13',
      gradient: 'from-green-400 to-teal-500'
    },
    {
      name: 'Lisa P.',
      role: 'Beauty Influencer',
      rating: 5,
      text: 'Best investment for my social media growth. Professional, reliable, and the results exceeded my expectations.',
      avatar: 'https://i.pravatar.cc/150?img=10',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      name: 'David R.',
      role: 'Tech Reviewer',
      rating: 5,
      text: 'Incredible results in just weeks. My engagement rate doubled and I finally reached the monetization threshold.',
      avatar: 'https://i.pravatar.cc/150?img=15',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ]

  return (
    <SectionWrapper background="white">
      {/* Background decorative elements */}
      <div className="bg-decoration bg-decoration-2 animate-pulse-slow"></div>
      <div className="bg-decoration bg-decoration-3 animate-float-slow animation-delay-3000"></div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          SocialBoost is Loved by Users Like You
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          93% of users return. We would also like you to return for more. Also, if you would like to post a review, you will find an option below this reviews section. Feel free to share.
        </p>
      </div>

      {/* Scrolling container */}
      <div className="relative z-10 -mx-4 px-4">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
        >
          {/* Original testimonials */}
          {testimonials.map((testimonial, index) => (
            <div
              key={`original-${index}`}
              className="flex-shrink-0 w-[350px] bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              <div className="border-t pt-4 flex items-center gap-4">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-md opacity-50`}></div>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate testimonials for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex-shrink-0 w-[350px] bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              <div className="border-t pt-4 flex items-center gap-4">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} rounded-full blur-md opacity-50`}></div>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </SectionWrapper>
  )
}

export default Testimonials
