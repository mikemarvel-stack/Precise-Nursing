'use client'

import { useState } from 'react'
import { PluginManager } from '@/components/plugin-manager'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Users, 
  Calendar, 
  Settings, 
  Package, 
  TrendingUp,
  Bell
} from 'lucide-react'

const stats = [
  {
    title: 'Nursing Documents',
    value: '1,247',
    change: '+18%',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    title: 'Orders Today',
    value: '12',
    change: '+3',
    icon: Calendar,
    color: 'text-green-600'
  },
  {
    title: 'Customer Satisfaction',
    value: '98.5%',
    change: '+0.2%',
    icon: Activity,
    color: 'text-emerald-600'
  },
  {
    title: 'Active Plugins',
    value: '8',
    change: '+1',
    icon: Package,
    color: 'text-purple-600'
  }
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'plugins' | 'settings'>('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PreciseNursing Dashboard</h1>
              <p className="text-gray-600">Your nursing document marketplace</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'plugins', label: 'Plugin Manager', icon: Package },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with PreciseNursing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={() => window.location.href = '/academic-content'} className="w-full justify-start">
                    Browse Nursing Documents
                  </Button>
                  <Button onClick={() => window.location.href = '/custom-order'} variant="outline" className="w-full justify-start">
                    Order Custom Assignment
                  </Button>
                  <Button onClick={() => window.location.href = '/auth/login'} variant="outline" className="w-full justify-start">
                    Login / Register
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Content</CardTitle>
                  <CardDescription>Popular nursing documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <h4 className="font-medium">Care Plans</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive nursing care plans for various conditions</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <h4 className="font-medium">Case Studies</h4>
                      <p className="text-sm text-muted-foreground">Detailed nursing case studies with analysis</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <h4 className="font-medium">Exam Prep</h4>
                      <p className="text-sm text-muted-foreground">Study materials for NCLEX and nursing exams</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'plugins' && <PluginManager />}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure your PreciseNursing platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Site Name</label>
                      <input 
                        type="text" 
                        defaultValue="PreciseNursing"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Admin Email</label>
                      <input 
                        type="email" 
                        defaultValue="admin@precisenursing.com"
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}