import React from 'react'
import { Button } from '@/components/ui/button'
import { useUIStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { Bell, Menu, Moon, Sun, User } from 'lucide-react'

interface TopbarProps {
  title: string
}

export function Topbar({ title }: TopbarProps) {
  const { theme, toggleTheme, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full"
              onClick={logout}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
