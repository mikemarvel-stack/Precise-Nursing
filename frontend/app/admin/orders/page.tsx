'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  User, 
  Mail, 
  Calendar,
  DollarSign,
  Eye,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function AdminOrdersPage() {
  const [customOrders, setCustomOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/custom-orders')
      const data = await response.json()
      setCustomOrders(data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    console.log(`Updating order ${orderId} to ${status}`)
    fetchOrders()
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading orders...</div>
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Custom Orders Management
        </h1>
        <p className="text-gray-600 mt-2">Manage and track all custom order requests</p>
      </div>

      {customOrders.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Custom Orders Yet</h3>
            <p className="text-gray-600">Custom orders will appear here when customers submit requests.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {customOrders.map((order: any) => (
            <Card key={order.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {order.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {order.category?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())} • {order.nursingLevel?.toUpperCase()}
                    </CardDescription>
                  </div>
                  <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-600">Customer</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{order.customerEmail}</p>
                        <p className="text-sm text-gray-600">Email</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(order.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Deadline</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">{order.pages} pages</p>
                        <p className="text-sm text-gray-600">Length</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-bold text-green-600 text-lg">${order.estimatedPrice}</p>
                        <p className="text-sm text-gray-600">Estimated Price</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Order Date</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subject</h4>
                  <p className="text-gray-700">{order.subject}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{order.description}</p>
                </div>
                
                {order.instructions && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Additional Instructions</h4>
                    <p className="text-gray-700">{order.instructions}</p>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => updateOrderStatus(order.id, 'in-progress')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Start Work
                  </Button>
                  <Button 
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                  <Button 
                    onClick={() => window.open(`mailto:${order.customerEmail}?subject=Re: ${order.title}`)}
                    variant="outline"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}