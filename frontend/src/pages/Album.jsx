import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { QrCode, Upload, Download, Share2, Calendar, MapPin, User } from 'lucide-react'

const Album = () => {
  const { id } = useParams()

  // Mock data
  const mockEvent = {
    name: "Priya & Rahul's Wedding",
    date: '2026-02-14',
    location: 'Taj Palace, Mumbai',
    host: 'Souvik Mahanty',
    photos: 24,
  }

  const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/400/400?random=${i}`,
    uploader: `Guest ${i + 1}`,
  }))

  return (
    <div className="flex-1 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Event Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold gradient-text">{mockEvent.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(mockEvent.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {mockEvent.location}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Hosted by {mockEvent.host}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-secondary flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR Code
              </button>
              <button className="btn-primary flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-8"
        >
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold gradient-text">{mockEvent.photos}</p>
            <p className="text-gray-600">Photos</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold gradient-text">12</p>
            <p className="text-gray-600">Contributors</p>
          </div>
          <div className="glass-card p-6 text-center">
            <p className="text-3xl font-bold gradient-text">156</p>
            <p className="text-gray-600">Views</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-8"
        >
          <button className="flex-1 glass-card p-4 font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            <Download className="w-5 h-5" />
            Download All
          </button>
          <button className="flex-1 glass-card p-4 font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
            <Share2 className="w-5 h-5" />
            Share Album
          </button>
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card overflow-hidden cursor-pointer"
            >
              <div className="aspect-square">
                <img
                  src={photo.url}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-600">by {photo.uploader}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Album
