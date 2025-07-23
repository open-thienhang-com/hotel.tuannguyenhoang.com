import { create } from 'zustand'

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
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@hotel.com',
    role: 'admin',
    avatar: 'https://github.com/shadcn.png'
  },
  isAuthenticated: true,
  login: async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'admin',
      avatar: 'https://github.com/shadcn.png'
    }
    set({ user: mockUser, isAuthenticated: true })
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  setUser: (user: User) => {
    set({ user })
  }
}))
