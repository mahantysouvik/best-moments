import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, QrCode, Share2, ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white pt-20 flex items-center relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
              >
                ✨ Capture Every Moment
              </motion.span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              Share Event Photos{' '}
              <span className="bg-gradient-to-r from-pink-300 to-yellow-300 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed">
              Create beautiful photo galleries for your events with QR codes. Let guests upload and
              share memories instantly!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/create"
                className="group btn-primary inline-flex items-center justify-center space-x-2 text-lg"
              >
                <span>Create Event</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg"
              >
                <span>Learn More</span>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white border-opacity-20">
              {[
                { value: '10K+', label: 'Events Created' },
                { value: '50K+', label: 'Photos Shared' },
                { value: '99%', label: 'Happy Users' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-purple-200 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Camera,
                  title: 'Easy Upload',
                  desc: 'Simple photo sharing',
                  gradient: 'from-pink-500 to-rose-500',
                },
                {
                  icon: QrCode,
                  title: 'QR Codes',
                  desc: 'Instant access',
                  gradient: 'from-purple-500 to-indigo-500',
                },
                {
                  icon: Share2,
                  title: 'Quick Share',
                  desc: 'One-click sharing',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Camera,
                  title: 'Beautiful',
                  desc: 'Stunning templates',
                  gradient: 'from-amber-500 to-yellow-500',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="card-glass p-6 space-y-3"
                >
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 rounded-xl flex items-center justify-center`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-purple-200 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Floating Element */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
