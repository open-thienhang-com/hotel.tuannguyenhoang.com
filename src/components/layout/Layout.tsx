import React, { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useUIStore } from '@/stores/ui'

interface LayoutProps {
  children: ReactNode
  title: string
  currentPath: string
  onNavigate: (path: string) => void
}

export function Layout({ children, title, currentPath, onNavigate }: LayoutProps) {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
