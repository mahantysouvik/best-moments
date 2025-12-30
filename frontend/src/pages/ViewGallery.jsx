import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  ArrowLeft,
  Download,
  Trash2,
  X,
  Folder,
  Grid,
  Image as ImageIcon,
  Filter,
} from 'lucide-react'
import { imageApi, albumApi, eventApi } from '../api'
import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'

const ViewGallery = () => {
  const { eventCode } = useParams()
  const [event, setEvent] = useState(null)
  const [images, setImages] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchEvent()
    fetchAlbums()
  }, [eventCode])

  useEffect(() => {
    fetchImages()
  }, [selectedAlbum, page])

  const fetchEvent = async () => {
    try {
      const response = await eventApi.getEventByCode(eventCode)
      setEvent(response.data)
    } catch (error) {
      toast.error('Event not found')
    }
  }

  const fetchAlbums = async () => {
    try {
      if (!event?.id) return
      const response = await albumApi.listAlbumsByEvent(event.id)
      setAlbums(response.data || [])
    } catch (error) {
      console.error('Error fetching albums:', error)
    }
  }

  const fetchImages = async () => {
    try {
      if (!event?.id) return
      
      let response
      if (selectedAlbum) {
        response = await imageApi.listImagesByAlbum(selectedAlbum, { page, limit: 30 })
      } else {
        response = await imageApi.listImagesByEvent(event.id, { page, limit: 30 })
      }
      
      const newImages = response.data || []
      setImages((prev) => (page === 1 ? newImages : [...prev, ...newImages]))
      setHasMore(newImages.length === 30)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.click()
      window.URL.revokeObjectURL(url)
      toast.success('Image downloaded!')
    } catch (error) {
      toast.error('Failed to download image')
    }
  }

  const deleteImage = async (imageId) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      await imageApi.deleteImage(imageId)
      setImages((prev) => prev.filter((img) => img.id !== imageId))
      toast.success('Image deleted')
    } catch (error) {
      toast.error('Failed to delete image')
    }
  }

  if (loading) return <Loading message="Loading gallery..." />

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          to={`/event/${eventCode}`}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Event
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title">{event?.event_name} Gallery</h1>
            <p className="section-subtitle">{images.length} photos captured</p>
          </div>
        </div>
      </motion.div>

      {/* Album Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-800">Filter by Album</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setSelectedAlbum(null)
              setPage(1)
            }}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              selectedAlbum === null
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Grid className="w-4 h-4 inline mr-2" />
            All Photos
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => {
                setSelectedAlbum(album.id)
                setPage(1)
              }}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedAlbum === album.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Folder className="w-4 h-4 inline mr-2" />
              {album.name} ({album.image_count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Image Grid */}
      {images.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No photos yet"
          description="Be the first to upload photos to this event!"
          action={
            <Link to={`/event/${eventCode}/upload`} className="btn-primary">
              Upload Photos
            </Link>
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.s3_url}
                  alt={image.original_filename}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.s3_url}
                alt={selectedImage.original_filename}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <div className="flex gap-4 mt-6 justify-center">
                <button
                  onClick={() =>
                    downloadImage(selectedImage.s3_url, selectedImage.original_filename)
                  }
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    deleteImage(selectedImage.id)
                    setSelectedImage(null)
                  }}
                  className="bg-red-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ViewGallery
