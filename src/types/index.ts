// Types for Hotel Management System

export interface Room {
  id: string
  number: string
  type: 'single' | 'double' | 'suite' | 'deluxe'
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning'
  price: number
  floor: number
  amenities: string[]
  capacity: number
  description?: string
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  city?: string
  country?: string
  dateOfBirth?: string
  nationality?: string
  idNumber?: string
  preferences?: string[]
  vip: boolean
  totalBookings: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  customerId: string
  customer?: Customer
  roomId: string
  room?: Room
  checkIn: string
  checkOut: string
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'
  adults: number
  children: number
  totalAmount: number
  paidAmount: number
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded'
  specialRequests?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Staff {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: 'manager' | 'receptionist' | 'housekeeper' | 'maintenance' | 'admin'
  department: string
  salary: number
  hireDate: string
  status: 'active' | 'inactive'
  address?: string
  emergencyContact?: string
  createdAt: string
  updatedAt: string
}

export interface Revenue {
  id: string
  date: string
  roomRevenue: number
  serviceRevenue: number
  totalRevenue: number
  occupancyRate: number
  averageRate: number
  bookingsCount: number
}

export interface DashboardStats {
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  maintenanceRooms: number
  todayCheckIns: number
  todayCheckOuts: number
  totalRevenue: number
  monthlyRevenue: number
  occupancyRate: number
  averageRate: number
}
