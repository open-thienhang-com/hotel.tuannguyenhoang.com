import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockRooms } from '@/lib/mock-data'
import { toastManager } from '@/lib/toast'
import { Plus, Search, Bed, Edit, Trash2 } from 'lucide-react'

const statusColors = {
  available: 'bg-green-100 text-green-800',
  occupied: 'bg-red-100 text-red-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  cleaning: 'bg-blue-100 text-blue-800',
}

export function Rooms() {
  const [searchTerm, setSearchTerm] = React.useState('')

  const filteredRooms = mockRooms.filter(
    room =>
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddRoom = () => {
    toastManager.infoMessage('Add room feature coming soon!')
  }

  const handleEditRoom = (roomNumber: string) => {
    toastManager.infoMessage(`Edit room ${roomNumber} feature coming soon!`)
  }

  const handleDeleteRoom = (roomNumber: string) => {
    toastManager.warningMessage(`Are you sure you want to delete room ${roomNumber}?`, 'Delete Room')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rooms</h2>
          <p className="text-muted-foreground">
            Manage hotel rooms and their availability
          </p>
        </div>
        <Button onClick={handleAddRoom}>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Rooms</CardTitle>
          <CardDescription>A list of all rooms in your hotel</CardDescription>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRooms.map(room => (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Room {room.number}</h3>
                    <p className="text-sm text-muted-foreground">
                      {room.type.charAt(0).toUpperCase() + room.type.slice(1)} •
                      Floor {room.floor} • ${room.price}/night
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Capacity: {room.capacity} • {room.amenities.join(', ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[room.status]}`}
                  >
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRoom(room.number)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRoom(room.number)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
