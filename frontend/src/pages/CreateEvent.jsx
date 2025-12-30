import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Calendar, MapPin, User, Phone, Mail, Sparkles, ChevronRight } from 'lucide-react'
import { templateApi, eventApi } from '../api'
import Loading from '../components/Loading'
import useEventStore from '../store/useEventStore'

const CreateEvent = () => {
  const navigate = useNavigate()
  const { setCurrentEvent, addRecentEvent, setUserPhone } = useEventStore()
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState([])
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const [formData, setFormData] = useState({
    event_name: '',
    event_type: 'wedding',
    event_date: '',
    host_name: '',
    host_phone: '',
    host_email: '',
    location: '',
    description: '',
  })

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', emoji: '💒', color: 'from-rose-400 to-pink-500' },
    { value: 'birthday', label: 'Birthday', emoji: '🎂', color: 'from-yellow-400 to-orange-500' },
    { value: 'engagement', label: 'Engagement', emoji: '💍', color: 'from-purple-400 to-pink-500' },
    { value: 'annoprasan', label: 'Annaprasan', emoji: '👶', color: 'from-green-400 to-teal-500' },
  ]

  useEffect(() => {
    fetchTemplates()
  }, [formData.event_type])

  const fetchTemplates = async () => {
    try {
      const response = await templateApi.getTemplatesByType(formData.event_type, { limit: 10 })
      setTemplates(response.data || [])
    } catch (error) {
      console.error('Error fetching templates:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedTemplate) {
      toast.error('Please select a template')
      return
    }

    setLoading(true)
    try {
      const eventData = {
        ...formData,
        template_id: selectedTemplate.id,
        event_date: new Date(formData.event_date).toISOString(),
      }

      const response = await eventApi.createEvent(eventData)
      const event = response.data

      toast.success('Event created successfully! 🎉')
      setCurrentEvent(event)
      addRecentEvent(event)
      setUserPhone(formData.host_phone)

      navigate(`/event/${event.event_code}`)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="section-title flex items-center justify-center gap-3">
          <Sparkles className="w-12 h-12" />
          Create Your Event
        </h1>
        <p className="section-subtitle">Set up your event in just a few minutes</p>
      </motion.div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              step >= 1
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            1
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
              step >= 2
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            2
          </div>
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          {/* Event Type Selection */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Event Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {eventTypes.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData((prev) => ({ ...prev, event_type: type.value }))}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    formData.event_type === type.value
                      ? 'border-purple-600 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{type.emoji}</div>
                  <div className="font-semibold text-gray-800">{type.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Template Selection */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose a Template</h2>
            {templates.length === 0 ? (
              <Loading message="Loading templates..." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                      selectedTemplate?.id === template.id
                        ? 'border-purple-600 shadow-2xl'
                        : 'border-gray-200 hover:border-purple-300 shadow-lg'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 relative">
                      <img
                        src={template.preview_url}
                        alt={template.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x600?text=Template'
                        }}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="font-semibold text-gray-800">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Event Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="e.g., Priya & Rahul's Wedding"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="datetime-local"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="host_name"
                    value={formData.host_name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="host_phone"
                    value={formData.host_phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="host_email"
                  value={formData.host_email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Event venue"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="input-field"
                  placeholder="Tell us about your event..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                  disabled={loading}
                >
                  Back
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Event 🎉'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CreateEvent
