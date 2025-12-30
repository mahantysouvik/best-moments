import { motion } from 'framer-motion'
import { Camera, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20">
      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-10 text-purple-300"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-10 text-pink-300"
      >
        <Camera className="w-16 h-16" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Capture Every
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Best Moment
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create stunning event galleries, share with QR codes, and let everyone upload their favorite photos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Create Event Free
            </Link>
            <Link
              to="/events"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all"
            >
              View My Events
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
