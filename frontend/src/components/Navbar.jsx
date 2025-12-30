import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Camera, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Best Moments
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              Create Event
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors"
            >
              My Events
            </Link>
            <Link
              to="/create"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
              >
                Home
              </Link>
              <Link
                to="/create"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
              >
                Create Event
              </Link>
              <Link
                to="/events"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-purple-600 font-semibold py-2"
              >
                My Events
              </Link>
              <Link
                to="/create"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
