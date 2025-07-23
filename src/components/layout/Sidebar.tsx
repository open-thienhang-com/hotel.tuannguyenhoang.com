import React from 'react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui'
import { 
  Home, 
  Bed, 
  Calendar, 
  Users, 
  UserCheck, 
  DollarSign, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Bed, label: 'Rooms', href: '/rooms' },
  { icon: Calendar, label: 'Bookings', href: '/bookings' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: UserCheck, label: 'Staff', href: '/staff' },
  { icon: DollarSign, label: 'Revenue', href: '/revenue' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

interface SidebarProps {
  currentPath: string
  onNavigate: (path: string) => void
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 ease-in-out",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {sidebarOpen && (
            <h1 className="text-xl font-semibold text-foreground">
              Hotel Admin
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Button
                  variant={currentPath === item.href ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    !sidebarOpen && "px-2"
                  )}
                  onClick={() => onNavigate(item.href)}
                >
                  <item.icon className={cn(
                    "h-4 w-4",
                    sidebarOpen && "mr-2"
                  )} />
                  {sidebarOpen && item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
