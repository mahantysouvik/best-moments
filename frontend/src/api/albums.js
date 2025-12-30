import apiClient from './client'

export const createAlbum = (data) => {
  return apiClient.post('/albums/', data)
}

export const getAlbumById = (albumId) => {
  return apiClient.get(`/albums/${albumId}`)
}

export const updateAlbum = (albumId, data) => {
  return apiClient.put(`/albums/${albumId}`, data)
}

export const deleteAlbum = (albumId) => {
  return apiClient.delete(`/albums/${albumId}`)
}

export const listAlbumsByEvent = (eventId) => {
  return apiClient.get(`/albums/event/${eventId}`)
}

export const albumApi = {
  createAlbum,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  listAlbumsByEvent,
}

export default albumApi
