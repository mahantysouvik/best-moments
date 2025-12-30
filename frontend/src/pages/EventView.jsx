import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  Download,
  Upload,
  Image,
  Calendar,
  MapPin,
  User,
  Copy,
  Share2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { eventApi } from '../api'
import Loading from '../components/Loading'
import html2canvas from 'html2canvas'

const EventView = () => {
  const { eventCode } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvent()
  }, [eventCode])

  const fetchEvent = async () => {
    try {
      const response = await eventApi.getEventByCode(eventCode)
      setEvent(response.data)
    } catch (error) {
      toast.error('Event not found')
    } finally {
      setLoading(false)
    }
  }

  const copyEventCode = () => {
    navigator.clipboard.writeText(event.event_code)
    toast.success('Event code copied!')
  }

  const shareEvent = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.event_name,
          text: `Join my event: ${event.event_name}`,
          url: url,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    } else {
      navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    }
  }

  const downloadTemplate = async () => {
    try {
      const element = document.getElementById('event-template')
      const canvas = await html2canvas(element)
      const link = document.createElement('a')
      link.download = `${event.event_name}-template.png`
      link.href = canvas.toDataURL()
      link.click()
      toast.success('Template downloaded!')
    } catch (error) {
      toast.error('Failed to download template')
    }
  }

  if (loading) return <Loading message="Loading event..." />
  if (!event) return null

  const eventUrl = window.location.href

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Event Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
          {event.event_name}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {new Date(event.event_date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {event.location}
            </div>
          )}
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {event.host_name}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* QR Code & Template */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div id="event-template" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Scan to Upload Photos</h2>
              <div className="bg-white p-8 rounded-2xl shadow-inner inline-block">
                <QRCodeSVG value={eventUrl} size={280} level="H" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-sm text-gray-600">Event Code</div>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-purple-50 px-6 py-3 rounded-xl font-mono text-2xl font-bold text-purple-700">
                  {event.event_code}
                </div>
                <button
                  onClick={copyEventCode}
                  className="p-3 bg-purple-100 rounded-xl hover:bg-purple-200 transition-colors"
                >
                  <Copy className="w-5 h-5 text-purple-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={downloadTemplate} className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download
            </button>
            <button onClick={shareEvent} className="btn-outline flex-1 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Link
            to={`/event/${eventCode}/upload`}
            className="card hover:shadow-2xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">Upload Photos</h3>
                <p className="text-gray-600">Share your memories with everyone</p>
              </div>
            </div>
          </Link>

          <Link
            to={`/event/${eventCode}/gallery`}
            className="card hover:shadow-2xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                <Image className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">View Gallery</h3>
                <p className="text-gray-600">
                  {event.total_images} photos uploaded
                </p>
              </div>
            </div>
          </Link>

          {event.description && (
            <div className="card">
              <h3 className="text-lg font-bold text-gray-800 mb-3">About This Event</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default EventView
