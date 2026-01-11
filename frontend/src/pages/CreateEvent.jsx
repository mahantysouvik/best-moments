import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, MapPin, User, Phone, Mail, Sparkles, Check } from 'lucide-react'

const CreateEvent = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    location: '',
    hostName: '',
    phone: '',
    email: '',
    eventType: 'wedding',
  })

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', emoji: '💒', color: 'from-rose-400 to-pink-500' },
    { value: 'birthday', label: 'Birthday', emoji: '🎂', color: 'from-yellow-400 to-orange-500' },
    { value: 'engagement', label: 'Engagement', emoji: '💍', color: 'from-purple-400 to-pink-500' },
    { value: 'party', label: 'Party', emoji: '🎉', color: 'from-blue-400 to-cyan-500' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock: Generate a random ID and navigate to album
    const mockId = Math.random().toString(36).substring(7)
    navigate(`/album/${mockId}`)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12" />
            Create Your Event
          </h1>
          <p className="text-xl text-gray-600">Set up your event in just a few simple steps</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
            step >= 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
          }`}>
            {step > 1 ? <Check className="w-6 h-6" /> : '1'}
          </div>
          <div className={`h-1 w-16 rounded transition-all ${
            step >= 2 ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
          }`} />
          <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
            step >= 2 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-110' : 'bg-gray-200 text-gray-500'
          }`}>
            2
          </div>
        </div>

        {/* Step 1: Event Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Select Event Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, eventType: type.value })}
                  className={`p-8 rounded-2xl border-2 transition-all ${
                    formData.eventType === type.value
                      ? 'border-purple-600 bg-purple-50 shadow-2xl scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                  }`}
                >
                  <div className="text-5xl mb-3">{type.emoji}</div>
                  <div className="font-semibold text-gray-800">{type.label}</div>
                </motion.button>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setStep(2)} className="btn-primary">
                Next Step →
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Event Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Event Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                  placeholder="e.g., Priya & Rahul's Wedding"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                    placeholder="Event venue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="hostName"
                    value={formData.hostName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                    placeholder="Host name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-600 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">
                  ← Back
                </button>
                <button type="submit" className="btn-primary flex-1">
                  🎉 Create Event
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CreateEvent
