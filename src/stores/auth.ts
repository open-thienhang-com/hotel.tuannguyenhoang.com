import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toastManager } from '@/lib/toast'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'staff'
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setUser: (user: User) => void
}

// Mock users for demonstration
const mockUsers: { [key: string]: { password: string; user: User } } = {
  'admin@hotel.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin User',
      email: 'admin@hotel.com',
      role: 'admin',
      avatar: 'https://github.com/shadcn.png',
    }
  },
  'manager@hotel.com': {
    password: 'manager123',
    user: {
      id: '2',
      name: 'Manager User',
      email: 'manager@hotel.com',
      role: 'manager',
      avatar: 'https://github.com/shadcn.png',
    }
  },
  'staff@hotel.com': {
    password: 'staff123',
    user: {
      id: '3',
      name: 'Staff User',
      email: 'staff@hotel.com',
      role: 'staff',
      avatar: 'https://github.com/shadcn.png',
    }
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        try {
          const mockUser = mockUsers[email.toLowerCase()]
          
          if (!mockUser) {
            toastManager.errorMessage('User not found')
            set({ isLoading: false })
            return false
          }
          
          if (mockUser.password !== password) {
            toastManager.errorMessage('Invalid password')
            set({ isLoading: false })
            return false
          }
          
          set({ 
            user: mockUser.user, 
            isAuthenticated: true, 
            isLoading: false 
          })
          
          toastManager.successMessage(`Welcome back, ${mockUser.user.name}!`)
          return true
        } catch (error) {
          toastManager.errorMessage('Login failed. Please try again.')
          set({ isLoading: false })
          return false
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
        toastManager.infoMessage('You have been logged out')
      },
      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
