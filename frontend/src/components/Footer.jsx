import { Heart, Github, Mail, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-lg">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold">Best Moments</h3>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Capture, share, and cherish your special moments. Create beautiful event galleries that last forever.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-purple-200 hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/mahantysouvik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-all transform hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@bestmoments.com"
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-all transform hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> by Souvik Mahanty © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
