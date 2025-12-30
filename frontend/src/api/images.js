import apiClient from './client'

export const uploadImage = async (eventId, file, albumId = null, onProgress) => {
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
}

export const getImageById = (imageId) => {
  return apiClient.get(`/images/${imageId}`)
}

export const deleteImage = (imageId) => {
  return apiClient.delete(`/images/${imageId}`)
}

export const listImagesByEvent = (eventId, params = {}) => {
  return apiClient.get(`/images/event/${eventId}`, { params })
}

export const listImagesByAlbum = (albumId, params = {}) => {
  return apiClient.get(`/images/album/${albumId}`, { params })
}

export const imageApi = {
  uploadImage,
  getImageById,
  deleteImage,
  listImagesByEvent,
  listImagesByAlbum,
}

export default imageApi
