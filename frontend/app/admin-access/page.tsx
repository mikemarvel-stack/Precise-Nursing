'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock } from 'lucide-react'

export default function AdminAccessPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple admin authentication (replace with real auth)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Store admin session
      localStorage.setItem('adminToken', 'admin-authenticated')
      localStorage.setItem('user', JSON.stringify({
        username: 'Admin',
        email: 'admin@precisenursing.com',
        role: { type: 'admin' }
      }))
      window.location.href = '/admin/dashboard'
    } else {
      alert('Invalid credentials. Use: admin / admin123')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Access
          </CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              disabled={isLoading}
            >
              <Lock className="w-4 h-4 mr-2" />
              {isLoading ? 'Authenticating...' : 'Access Admin Panel'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo: admin / admin123
            </p>
            <Button 
              variant="ghost" 
              onClick={() => window.location.href = '/'}
              className="mt-2"
            >
              Back to Main Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}