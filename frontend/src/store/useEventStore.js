import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useEventStore = create(
  persist(
    (set, get) => ({
      currentEvent: null,
      recentEvents: [],
      userPhone: null,

      // Set current event
      setCurrentEvent: (event) => set({ currentEvent: event }),

      // Clear current event
      clearCurrentEvent: () => set({ currentEvent: null }),

      // Add to recent events
      addRecentEvent: (event) => {
        const recent = get().recentEvents
        const filtered = recent.filter((e) => e.id !== event.id)
        set({ recentEvents: [event, ...filtered].slice(0, 10) })
      },

      // Set user phone
      setUserPhone: (phone) => set({ userPhone: phone }),

      // Get event by code from recent
      getRecentEventByCode: (code) => {
        return get().recentEvents.find((e) => e.event_code === code)
      },
    }),
    {
      name: 'event-storage',
    }
  )
)

export default useEventStore
