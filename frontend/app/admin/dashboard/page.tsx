'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Activity,
  Package,
  Settings,
  Eye
} from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: DollarSign,
    color: 'from-green-400 to-green-600'
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+15.3%',
    icon: Users,
    color: 'from-blue-400 to-blue-600'
  },
  {
    title: 'Documents Sold',
    value: '1,247',
    change: '+18.2%',
    icon: FileText,
    color: 'from-purple-400 to-purple-600'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2.4%',
    icon: TrendingUp,
    color: 'from-orange-400 to-orange-600'
  }
]

const recentOrders = [
  { id: 1, customer: 'Sarah Johnson', document: 'Nursing Care Plan - Diabetes', amount: '$29.99', status: 'completed' },
  { id: 2, customer: 'Mike Chen', document: 'Pediatric Case Study', amount: '$24.99', status: 'processing' },
  { id: 3, customer: 'Emma Davis', document: 'Mental Health Assessment', amount: '$34.99', status: 'completed' },
  { id: 4, customer: 'James Wilson', document: 'Custom Assignment - ICU Care', amount: '$89.99', status: 'in-progress' }
]

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [customOrders, setCustomOrders] = useState([])

  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      window.location.href = '/admin-access'
      return
    }
    
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/admin-access'
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role?.type !== 'admin') {
      window.location.href = '/admin-access'
      return
    }
    
    setUser(parsedUser)
  }, [])

  useEffect(() => {
    // Fetch custom orders
    fetch('/api/custom-orders')
      .then(res => res.json())
      .then(data => setCustomOrders(data))
      .catch(err => console.error('Failed to fetch orders:', err))
  }, [])

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Welcome back, manage your nursing platform</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                🟢 System Healthy
              </div>
              <Button 
                onClick={() => {
                  localStorage.removeItem('user')
                  localStorage.removeItem('adminToken')
                  window.location.href = '/'
                }} 
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Recent Orders
              </CardTitle>
              <CardDescription>Latest customer purchases and custom orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customOrders.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-blue-600 mb-2">Custom Orders</h3>
                    {customOrders.slice(0, 3).map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{order.customerName}</h4>
                          <p className="text-sm text-gray-600">{order.title}</p>
                          <p className="text-xs text-gray-500">{order.customerEmail}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">${order.estimatedPrice}</p>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{order.customer}</h4>
                      <p className="text-sm text-gray-600">{order.document}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{order.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View All Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your platform efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
                onClick={() => window.location.href = '/admin/content'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Edit Solutions
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                onClick={() => window.location.href = '/admin/orders'}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Orders
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" 
                onClick={() => window.location.href = '/admin/plugins'}
              >
                <Package className="w-4 h-4 mr-2" />
                Plugin Manager
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Monthly revenue and growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Analytics Chart</p>
                <p className="text-sm text-gray-500">Revenue trends and performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}