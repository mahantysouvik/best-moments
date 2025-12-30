import apiClient from './client'

export const albumApi = {
  // Create album
  createAlbum: async (albumData) => {
    return apiClient.post('/albums/', albumData)
  },

  // Get album by ID
  getAlbum: async (albumId) => {
    return apiClient.get(`/albums/${albumId}`)
  },

  // Update album
  updateAlbum: async (albumId, albumData) => {
    return apiClient.put(`/albums/${albumId}`, albumData)
  },

  // Delete album
  deleteAlbum: async (albumId) => {
    return apiClient.delete(`/albums/${albumId}`)
  },

  // List albums by event
  listAlbumsByEvent: async (eventId, params = {}) => {
    return apiClient.get(`/albums/event/${eventId}`, { params })
  },
}

export default albumApi
