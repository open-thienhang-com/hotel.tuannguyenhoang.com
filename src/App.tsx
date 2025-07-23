import React, { useState, useEffect } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Rooms } from '@/pages/Rooms'
import { Bookings } from '@/pages/Bookings'
import { useUIStore } from '@/stores/ui'
import '@/index.css'

function App() {
  const [currentPath, setCurrentPath] = useState('/')
  const { theme } = useUIStore()

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/': return 'Dashboard'
      case '/rooms': return 'Rooms'
      case '/bookings': return 'Bookings'
      case '/customers': return 'Customers'
      case '/staff': return 'Staff'
      case '/revenue': return 'Revenue'
      case '/settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  const renderPage = () => {
    switch (currentPath) {
      case '/': return <Dashboard />
      case '/rooms': return <Rooms />
      case '/bookings': return <Bookings />
      case '/customers': return <div className="p-8"><h2 className="text-2xl font-bold">Customers Page</h2><p>Coming soon...</p></div>
      case '/staff': return <div className="p-8"><h2 className="text-2xl font-bold">Staff Page</h2><p>Coming soon...</p></div>
      case '/revenue': return <div className="p-8"><h2 className="text-2xl font-bold">Revenue Page</h2><p>Coming soon...</p></div>
      case '/settings': return <div className="p-8"><h2 className="text-2xl font-bold">Settings Page</h2><p>Coming soon...</p></div>
      default: return <Dashboard />
    }
  }

  return (
    <Layout
      title={getPageTitle(currentPath)}
      currentPath={currentPath}
      onNavigate={setCurrentPath}
    >
      {renderPage()}
    </Layout>
  )
}

export default App
