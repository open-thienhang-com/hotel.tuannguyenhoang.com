import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockBookings, mockCustomers, mockRooms } from '@/lib/mock-data'
import { Plus, Search, Calendar, User, Bed } from 'lucide-react'
import { format } from 'date-fns'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  'checked-in': 'bg-green-100 text-green-800',
  'checked-out': 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800'
}

export function Bookings() {
  const [searchTerm, setSearchTerm] = React.useState('')
  
  const bookingsWithDetails = mockBookings.map(booking => {
    const customer = mockCustomers.find(c => c.id === booking.customerId)
    const room = mockRooms.find(r => r.id === booking.roomId)
    return { ...booking, customer, room }
  })

  const filteredBookings = bookingsWithDetails.filter(booking => 
    booking.customer?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customer?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.room?.number.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
          <p className="text-muted-foreground">
            Manage hotel bookings and reservations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
          <CardDescription>
            A list of all bookings in your hotel
          </CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {booking.customer?.firstName} {booking.customer?.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <Bed className="inline h-3 w-3 mr-1" />
                      Room {booking.room?.number} • 
                      {format(new Date(booking.checkIn), 'MMM dd')} - {format(new Date(booking.checkOut), 'MMM dd')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <User className="inline h-3 w-3 mr-1" />
                      {booking.adults} adult{booking.adults !== 1 ? 's' : ''} 
                      {booking.children > 0 && `, ${booking.children} child${booking.children !== 1 ? 'ren' : ''}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold">${booking.totalAmount}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.paymentStatus === 'paid' ? 'Paid' : 
                       booking.paymentStatus === 'partial' ? `$${booking.paidAmount} paid` : 'Unpaid'}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[booking.status]}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
