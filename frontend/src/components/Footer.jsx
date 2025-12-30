import { Camera, Heart, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white p-2 rounded-xl">
                <Camera className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-xl font-bold">Best Moments</span>
            </div>
            <p className="text-purple-200">
              Capture and share your special moments with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-purple-200 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/create" className="block text-purple-200 hover:text-white transition-colors">
                Create Event
              </Link>
              <Link to="/events" className="block text-purple-200 hover:text-white transition-colors">
                My Events
              </Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold text-lg mb-4">Features</h3>
            <div className="space-y-2 text-purple-200">
              <p>QR Code Generation</p>
              <p>Photo Albums</p>
              <p>Easy Sharing</p>
              <p>Cloud Storage</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/mahantysouvik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/mahantysouvik"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:mahantysouvik@gmail.com"
                className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-pink-400" /> by
            <a
              href="https://github.com/mahantysouvik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:underline"
            >
              Souvik Mahanty
            </a>
          </p>
          <p className="mt-2 text-sm">
            © {new Date().getFullYear()} Best Moments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
