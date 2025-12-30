import apiClient from './client'

export const createEvent = (data) => {
  return apiClient.post('/events/', data)
}

export const getEventById = (eventId) => {
  return apiClient.get(`/events/${eventId}`)
}

export const getEventByCode = (eventCode) => {
  return apiClient.get(`/events/code/${eventCode}`)
}

export const updateEvent = (eventId, data) => {
  return apiClient.put(`/events/${eventId}`, data)
}

export const deleteEvent = (eventId) => {
  return apiClient.delete(`/events/${eventId}`)
}

export const listEvents = (params = {}) => {
  return apiClient.get('/events/', { params })
}

export const listEventsByPhone = (phoneNumber) => {
  return apiClient.get('/events/', { params: { phone_number: phoneNumber } })
}

export const eventApi = {
  createEvent,
  getEventById,
  getEventByCode,
  updateEvent,
  deleteEvent,
  listEvents,
  listEventsByPhone,
}

export default eventApi
