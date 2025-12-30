import apiClient from './client'

export const templateApi = {
  // Get all templates
  getTemplates: async (params = {}) => {
    return apiClient.get('/templates/', { params })
  },

  // Get templates by event type
  getTemplatesByType: async (eventType, params = {}) => {
    return apiClient.get('/templates/', { params: { event_type: eventType, ...params } })
  },

  // Get template by ID
  getTemplate: async (templateId) => {
    return apiClient.get(`/templates/${templateId}`)
  },

  // Create template (admin)
  createTemplate: async (templateData) => {
    return apiClient.post('/templates/', templateData)
  },

  // Delete template (admin)
  deleteTemplate: async (templateId) => {
    return apiClient.delete(`/templates/${templateId}`)
  },
}

export default templateApi
