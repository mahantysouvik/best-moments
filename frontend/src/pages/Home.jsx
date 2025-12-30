import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import {
  QrCode,
  Upload,
  Image,
  Shield,
  Zap,
  Users,
  Heart,
  Star,
  CheckCircle,
} from 'lucide-react'

const Home = () => {
  const steps = [
    {
      icon: QrCode,
      title: 'Create Event',
      description: 'Set up your event with beautiful templates and get a unique QR code',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Upload,
      title: 'Share QR Code',
      description: 'Display your QR code for guests to scan and access the gallery',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Image,
      title: 'Collect Photos',
      description: 'Guests upload photos instantly. Organize them in beautiful albums',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  const benefits = [
    { icon: Zap, text: 'Lightning Fast Upload' },
    { icon: Shield, text: 'Secure & Private' },
    { icon: Users, text: 'Easy Guest Access' },
    { icon: Heart, text: 'Beautiful Templates' },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      event: 'Wedding',
      text: 'Amazing! All our wedding photos in one place. Guests loved the QR code feature!',
      rating: 5,
    },
    {
      name: 'Rahul Kumar',
      event: 'Birthday Party',
      text: 'Super easy to use. No more asking everyone to share photos separately.',
      rating: 5,
    },
    {
      name: 'Anita Desai',
      event: 'Engagement',
      text: 'The templates are gorgeous! Made our engagement memories even more special.',
      rating: 5,
    },
  ]

  return (
    <div>
      <Hero />

      {/* How It Works */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to capture all your event memories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                <div className="card text-center space-y-6 relative overflow-hidden">
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-purple-100">
                    {index + 1}
                  </div>

                  <div
                    className={`bg-gradient-to-br ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl relative z-10`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Why Choose Best Moments?</h2>
            <p className="section-subtitle">
              The perfect solution for your event photo sharing needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="card-glass text-center p-6 space-y-4"
              >
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <p className="font-semibold text-gray-800">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Loved by Thousands</h2>
            <p className="section-subtitle">See what our users have to say</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="card space-y-4"
              >
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ready to Create Amazing Memories?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Start capturing your special moments today. It's free and takes less than a minute!
            </p>
            <Link
              to="/create"
              className="inline-block bg-white text-purple-600 font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
