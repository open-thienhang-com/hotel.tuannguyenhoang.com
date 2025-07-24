import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { mockDashboardStats } from '@/lib/mock-data'
import { toastManager } from '@/lib/toast'
import {
  Bed,
  Calendar,
  DollarSign,
  TrendingUp,
  RefreshCw
} from 'lucide-react'

export function Dashboard() {
  const stats = mockDashboardStats

  const handleRefreshData = () => {
    toastManager.infoMessage('Refreshing dashboard data...')
    
    // Simulate data refresh
    setTimeout(() => {
      toastManager.successMessage('Dashboard data updated successfully!')
    }, 1500)
  }

  const statCards = [
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: Bed,
      description: `${stats.occupiedRooms} occupied, ${stats.availableRooms} available`,
    },
    {
      title: 'Today Check-ins',
      value: stats.todayCheckIns,
      icon: Calendar,
      description: `${stats.todayCheckOuts} check-outs today`,
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      description: 'Current occupancy level',
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: `Average rate: $${stats.averageRate}`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your hotel management system
          </p>
        </div>
        <Button onClick={handleRefreshData} className="ml-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest booking activity in your hotel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Room 102 - Alice Johnson
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check-in: July 20, 2024
                  </p>
                </div>
                <div className="ml-auto font-medium">$750</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Room 101 - Bob Smith
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check-in: July 25, 2024
                  </p>
                </div>
                <div className="ml-auto font-medium">$200</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>Current status of all rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Available</span>
                <span className="text-sm font-medium">
                  {stats.availableRooms}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Occupied</span>
                <span className="text-sm font-medium">
                  {stats.occupiedRooms}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Maintenance</span>
                <span className="text-sm font-medium">
                  {stats.maintenanceRooms}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
