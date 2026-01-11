import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Camera, QrCode, Image, Sparkles, Heart, Users, Zap, Shield } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: QrCode,
      title: 'QR Code Access',
      description: 'Generate unique QR codes for instant guest access',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Camera,
      title: 'Instant Upload',
      description: 'Upload and share photos in seconds from any device',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Image,
      title: 'Beautiful Galleries',
      description: 'Organize memories in stunning, shareable albums',
      color: 'from-blue-500 to-blue-600',
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for seamless experience',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your memories are protected and private',
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Everyone can contribute to the album',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Designed for your special moments',
    },
  ]

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 90, 180],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block"
            >
              <Sparkles className="w-20 h-20 text-purple-600 mx-auto" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="gradient-text">Capture Every</span>
              <br />
              <span className="gradient-text">Special Moment</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Create beautiful event galleries with QR codes. Let your guests upload and share photos
              instantly. Make memories that last forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/create" className="btn-primary text-lg">
                🎉 Create Your Event
              </Link>
              <a href="#features" className="btn-secondary text-lg">
                Learn More →
              </a>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-16"
            >
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">1000+</p>
                <p className="text-gray-600 text-sm">Events Created</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">50K+</p>
                <p className="text-gray-600 text-sm">Photos Shared</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold gradient-text">100%</p>
                <p className="text-gray-600 text-sm">Free Forever</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to capture and share moments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 text-center space-y-4"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-xl`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Built with your needs in mind</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 text-center space-y-3"
              >
                <benefit.icon className="w-12 h-12 mx-auto text-purple-600" />
                <h4 className="text-xl font-bold text-gray-800">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600">
              Create your first event in minutes. It's free, easy, and beautiful.
            </p>
            <Link to="/create" className="btn-primary text-lg inline-block">
              ✨ Create Your Event Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
