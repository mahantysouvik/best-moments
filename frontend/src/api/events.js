import apiClient from './client'

export const eventApi = {
  // Create a new event
  createEvent: async (eventData) => {
    return apiClient.post('/events/', eventData)
  },

  // Get event by ID
  getEvent: async (eventId) => {
    return apiClient.get(`/events/${eventId}`)
  },

  // Get event by code
  getEventByCode: async (eventCode) => {
    return apiClient.get(`/events/code/${eventCode}`)
  },

  // Update event
  updateEvent: async (eventId, eventData) => {
    return apiClient.put(`/events/${eventId}`, eventData)
  },

  // Delete event
  deleteEvent: async (eventId) => {
    return apiClient.delete(`/events/${eventId}`)
  },

  // List events
  listEvents: async (params = {}) => {
    return apiClient.get('/events/', { params })
  },

  // List events by host phone
  listEventsByPhone: async (phone, params = {}) => {
    return apiClient.get('/events/', { params: { host_phone: phone, ...params } })
  },
}

export default eventApi
