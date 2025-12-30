export { default as apiClient } from './client'
export * from './events'
export * from './albums'
export * from './images'
export * from './templates'

// Export individual APIs
import * as eventApi from './events'
import * as albumApi from './albums'
import * as imageApi from './images'
import * as templateApi from './templates'

export { eventApi, albumApi, imageApi, templateApi }
