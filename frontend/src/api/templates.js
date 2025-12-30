import apiClient from './client'

export const createTemplate = (data) => {
  return apiClient.post('/templates/', data)
}

export const getTemplateById = (templateId) => {
  return apiClient.get(`/templates/${templateId}`)
}

export const listTemplates = (params = {}) => {
  return apiClient.get('/templates/', { params })
}

export const listTemplatesByType = (eventType) => {
  return apiClient.get('/templates/', { params: { event_type: eventType } })
}

export const templateApi = {
  createTemplate,
  getTemplateById,
  listTemplates,
  listTemplatesByType,
}

export default templateApi
