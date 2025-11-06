'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  FileText,
  ShoppingCart,
  Eye,
  Download
} from 'lucide-react'

const analyticsData = {
  revenue: {
    current: 45231,
    previous: 37650,
    growth: 20.1
  },
  users: {
    current: 2350,
    previous: 2040,
    growth: 15.2
  },
  orders: {
    current: 1247,
    previous: 1055,
    growth: 18.2
  },
  documents: {
    current: 89,
    previous: 76,
    growth: 17.1
  }
}

const topDocuments = [
  { name: 'Nursing Care Plan - Diabetes', sales: 156, revenue: 4680 },
  { name: 'Pediatric Case Study Template', sales: 134, revenue: 3350 },
  { name: 'Mental Health Assessment', sales: 98, revenue: 3430 },
  { name: 'ICU Care Protocols', sales: 87, revenue: 2610 },
  { name: 'Medication Administration', sales: 76, revenue: 2280 }
]

const recentActivity = [
  { action: 'New user registration', user: 'sarah.johnson@email.com', time: '2 minutes ago' },
  { action: 'Document purchased', user: 'mike.chen@email.com', time: '5 minutes ago' },
  { action: 'Custom order placed', user: 'emma.davis@email.com', time: '12 minutes ago' },
  { action: 'Payment completed', user: 'james.wilson@email.com', time: '18 minutes ago' },
  { action: 'New document uploaded', user: 'admin', time: '25 minutes ago' }
]

export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Track your platform performance and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ${analyticsData.revenue.current.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">
              +{analyticsData.revenue.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {analyticsData.users.current.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">
              +{analyticsData.users.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {analyticsData.orders.current.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">
              +{analyticsData.orders.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Documents</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {analyticsData.documents.current}
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">
              +{analyticsData.documents.growth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Revenue Chart</p>
                <p className="text-sm text-gray-500">Interactive chart would be here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              User Growth
            </CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">User Growth Chart</p>
                <p className="text-sm text-gray-500">Interactive chart would be here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Top Selling Documents
            </CardTitle>
            <CardDescription>Best performing documents this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">${doc.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}