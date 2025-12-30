import apiClient from './client'
import axios from 'axios'

export const imageApi = {
  // Upload image
  uploadImage: async (eventId, file, albumId = null, onProgress = null) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('event_id', eventId)
    if (albumId) {
      formData.append('album_id', albumId)
    }

    return apiClient.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          onProgress(percentCompleted)
        }
      },
    })
  },

  // Get image by ID
  getImage: async (imageId) => {
    return apiClient.get(`/images/${imageId}`)
  },

  // Delete image
  deleteImage: async (imageId) => {
    return apiClient.delete(`/images/${imageId}`)
  },

  // List images by event
  listImagesByEvent: async (eventId, params = {}) => {
    return apiClient.get(`/images/event/${eventId}`, { params })
  },

  // List images by album
  listImagesByAlbum: async (albumId, params = {}) => {
    return apiClient.get(`/images/album/${albumId}`, { params })
  },

  // Move image to album
  moveImageToAlbum: async (imageId, albumId = null) => {
    return apiClient.patch(`/images/${imageId}/move`, null, {
      params: { album_id: albumId },
    })
  },
}

export default imageApi
