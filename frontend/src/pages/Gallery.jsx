import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { X, Download, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const Gallery = () => {
  const { id } = useParams()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState(false)

  const mockPhotos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `https://picsum.photos/800/600?random=${i}`,
    uploader: `Guest ${i + 1}`,
    likes: Math.floor(Math.random() * 50),
  }))

  const currentPhoto = mockPhotos[currentIndex]

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % mockPhotos.length)
    setLiked(false)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + mockPhotos.length) % mockPhotos.length)
    setLiked(false)
  }

  return (
    <div className="flex-1 bg-black/95">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 text-white">
          <div>
            <p className="text-sm text-gray-400">Photo {currentIndex + 1} of {mockPhotos.length}</p>
            <p className="text-sm">Uploaded by {currentPhoto.uploader}</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Photo */}
        <div className="flex-1 flex items-center justify-center relative px-6">
          <button
            onClick={prevPhoto}
            className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <motion.img
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={currentPhoto.url}
            alt={`Photo ${currentPhoto.id}`}
            className="max-h-full max-w-full rounded-2xl shadow-2xl"
          />

          <button
            onClick={nextPhoto}
            className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-6 p-6">
          <button
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-lg text-white"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{currentPhoto.likes + (liked ? 1 : 0)}</span>
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-lg text-white">
            <Download className="w-5 h-5" />
            Download
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-lg text-white">
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {/* Thumbnails */}
        <div className="overflow-x-auto p-6 pt-0">
          <div className="flex gap-2 justify-center">
            {mockPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => {setCurrentIndex(index); setLiked(false)}}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex ? 'ring-4 ring-purple-500 scale-110' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <img src={photo.url} alt={`Thumb ${photo.id}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
