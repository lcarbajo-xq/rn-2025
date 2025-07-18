import { getCurrentUser } from '@/lib/appwrite'
import { User } from '@/type'
import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean

  setIsAuthenticated: (value: boolean) => void

  setUser: (user: User | null) => void

  fetchAuthenticatedUser: () => Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user: user }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true })
    try {
      const user = await getCurrentUser()

      if (user) set({ user: user as User, isAuthenticated: true })
      else set({ user: null, isAuthenticated: false })
    } catch (error) {
      console.log('Fetch User error', error)
      set({ user: null })
    } finally {
      set({ isLoading: false })
    }
  }
}))

export default useAuthStore
