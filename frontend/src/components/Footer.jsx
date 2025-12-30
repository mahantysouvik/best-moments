import { Heart, Github, Twitter, Mail, Camera } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-lg">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold">Best Moments</h3>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Capture, share, and cherish your special moments with ease. Make every event memorable.
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
              <li>
                <Link to="/my-events" className="text-purple-200 hover:text-white transition-colors">
                  My Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li>• QR Code Generation</li>
              <li>• Beautiful Templates</li>
              <li>• Easy Photo Upload</li>
              <li>• Album Organization</li>
              <li>• Secure Storage</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Connect</h4>
            <div className="flex space-x-4">
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
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 p-3 rounded-xl hover:bg-white/30 transition-all transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> by
            Souvik Mahanty © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
