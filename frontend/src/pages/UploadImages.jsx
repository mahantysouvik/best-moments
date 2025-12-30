import { useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import {
  Upload,
  X,
  CheckCircle,
  Folder,
  Plus,
  Image as ImageIcon,
  ArrowLeft,
} from 'lucide-react'
import { imageApi, albumApi } from '../api'

const UploadImages = () => {
  const { eventCode } = useParams()
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [albums, setAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [showNewAlbum, setShowNewAlbum] = useState(false)
  const [newAlbumName, setNewAlbumName] = useState('')
  const [eventId, setEventId] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 10485760, // 10MB
  })

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const createAlbum = async () => {
    if (!newAlbumName.trim()) {
      toast.error('Please enter album name')
      return
    }

    try {
      const response = await albumApi.createAlbum({
        event_id: eventId,
        name: newAlbumName,
        description: '',
      })
      setAlbums((prev) => [response.data, ...prev])
      setSelectedAlbum(response.data.id)
      setNewAlbumName('')
      setShowNewAlbum(false)
      toast.success('Album created!')
    } catch (error) {
      toast.error('Failed to create album')
    }
  }

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error('No files to upload')
      return
    }

    setUploading(true)
    const uploadPromises = files
      .filter((f) => f.status === 'pending')
      .map(async (fileObj) => {
        try {
          await imageApi.uploadImage(
            eventId,
            fileObj.file,
            selectedAlbum,
            (progress) => {
              setUploadProgress((prev) => ({
                ...prev,
                [fileObj.id]: progress,
              }))
            }
          )

          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, status: 'success' } : f
            )
          )
        } catch (error) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileObj.id ? { ...f, status: 'error' } : f
            )
          )
          toast.error(`Failed to upload ${fileObj.file.name}`)
        }
      })

    await Promise.all(uploadPromises)
    setUploading(false)
    toast.success('All photos uploaded! 🎉')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
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
        <h1 className="section-title">Upload Photos</h1>
        <p className="section-subtitle">Share your beautiful moments with everyone</p>
      </motion.div>

      {/* Album Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Folder className="w-6 h-6" />
            Select Album (Optional)
          </h2>
          <button
            onClick={() => setShowNewAlbum(!showNewAlbum)}
            className="btn-outline py-2 px-4 text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Album
          </button>
        </div>

        {showNewAlbum && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-3 mb-4"
          >
            <input
              type="text"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              placeholder="Album name"
              className="input-field flex-1"
              onKeyPress={(e) => e.key === 'Enter' && createAlbum()}
            />
            <button onClick={createAlbum} className="btn-primary py-3 px-6">
              Create
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setSelectedAlbum(null)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedAlbum === null
                ? 'border-purple-600 bg-purple-50 shadow-lg'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-sm font-semibold">All Photos</div>
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbum(album.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedAlbum === album.id
                  ? 'border-purple-600 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <Folder className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-sm font-semibold truncate">{album.name}</div>
              <div className="text-xs text-gray-500">{album.image_count} photos</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-8"
      >
        <div
          {...getRootProps()}
          className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-25'
          }`}
        >
          <input {...getInputProps()} />
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                {isDragActive ? 'Drop your photos here' : 'Drag & drop photos here'}
              </p>
              <p className="text-gray-600">or click to select files</p>
              <p className="text-sm text-gray-500 mt-2">Max 10MB per file</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* File Preview */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {files.length} Photo{files.length > 1 ? 's' : ''} Selected
            </h2>
            <button
              onClick={uploadFiles}
              disabled={uploading || files.every((f) => f.status !== 'pending')}
              className="btn-primary flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {uploading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {files.map((fileObj) => (
                <motion.div
                  key={fileObj.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                    <img
                      src={fileObj.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Status Overlay */}
                    {fileObj.status === 'success' && (
                      <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                    
                    {fileObj.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center">
                        <X className="w-12 h-12 text-white" />
                      </div>
                    )}
                    
                    {/* Progress Bar */}
                    {uploadProgress[fileObj.id] > 0 && uploadProgress[fileObj.id] < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                        <div
                          className="h-full bg-purple-600 transition-all"
                          style={{ width: `${uploadProgress[fileObj.id]}%` }}
                        />
                      </div>
                    )}
                    
                    {/* Remove Button */}
                    {fileObj.status === 'pending' && (
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2 truncate">
                    {fileObj.file.name}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UploadImages
