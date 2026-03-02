import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Services: [
      { name: 'TikTok Growth', path: '/tiktok' },
      { name: 'Instagram Boost', path: '/instagram' },
      { name: 'Facebook Likes', path: '/facebook' },
      { name: 'YouTube Views', path: '/youtube' }
    ],
    Company: [
      { name: 'About Us', path: '#' },
      { name: 'Contact', path: '#' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' }
    ],
    Support: [
      { name: 'Help Center', path: '#' },
      { name: 'FAQ', path: '#' },
      { name: 'Refund Policy', path: '#' },
      { name: 'Contact Support', path: '#' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              SocialBoost
            </h3>
            <p className="text-sm">
              Your trusted partner for social media growth. Safe, secure, and effective.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} SocialBoost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
