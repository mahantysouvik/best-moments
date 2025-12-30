import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create Event' },
    { path: '/my-events', label: 'My Events' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-xl shadow-lg"
            >
              <Camera className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                Best Moments
              </h1>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Capture memories
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-purple-50 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-purple-600" />
            ) : (
              <Menu className="w-6 h-6 text-purple-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-2"
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-700 hover:bg-purple-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
