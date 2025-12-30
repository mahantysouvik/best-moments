import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  QrCode,
  Phone,
  Search,
  Plus,
} from 'lucide-react'
import { eventApi } from '../api'
import useEventStore from '../store/useEventStore'
import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'

const EventDetails = () => {
  const { userPhone, recentEvents } = useEventStore()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState(userPhone || '')
  const [searchMode, setSearchMode] = useState(!userPhone)

  useEffect(() => {
    if (userPhone) {
      fetchEventsByPhone(userPhone)
    } else {
      setEvents(recentEvents)
      setLoading(false)
    }
  }, [])

  const fetchEventsByPhone = async (phone) => {
    setLoading(true)
    try {
      const response = await eventApi.listEventsByPhone(phone)
      setEvents(response.data || [])
    } catch (error) {
      toast.error('Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (!phoneNumber.trim()) {
      toast.error('Please enter a phone number')
      return
    }
    fetchEventsByPhone(phoneNumber)
  }

  if (loading) return <Loading message="Loading your events..." />

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="section-title">My Events</h1>
        <p className="section-subtitle">View and manage all your events</p>
      </motion.div>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Find Your Events
        </h2>
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>
      </motion.div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description="You haven't created any events yet. Start by creating your first event!"
          action={
            <Link to="/create" className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Event
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/event/${event.event_code}`}
                className="card group hover:shadow-2xl transition-all block"
              >
                {/* Event Image/Template Preview */}
                <div className="aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-purple-100 to-pink-100 relative">
                  <img
                    src={event.template_image_url}
                    alt={event.event_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Event'
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-semibold text-purple-700">
                    {event.event_type}
                  </div>
                </div>

                {/* Event Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {event.event_name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.event_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    {event.total_images} photos
                  </div>
                </div>

                {/* Event Code */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <QrCode className="w-4 h-4" />
                      <span className="font-mono font-semibold">{event.event_code}</span>
                    </div>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                      Active
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventDetails
