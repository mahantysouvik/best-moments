import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useEventStore = create(
  persist(
    (set) => ({
      // Current event being created
      currentEvent: null,
      setCurrentEvent: (event) => set({ currentEvent: event }),
      
      // Recently viewed/created events
      recentEvents: [],
      addRecentEvent: (event) =>
        set((state) => ({
          recentEvents: [
            event,
            ...state.recentEvents.filter((e) => e.id !== event.id),
          ].slice(0, 10), // Keep only last 10
        })),
      
      // User phone number for quick access
      userPhone: null,
      setUserPhone: (phone) => set({ userPhone: phone }),
      
      // Clear all data
      clearStore: () =>
        set({
          currentEvent: null,
          recentEvents: [],
          userPhone: null,
        }),
    }),
    {
      name: 'best-moments-storage', // LocalStorage key
    }
  )
)

export default useEventStore
