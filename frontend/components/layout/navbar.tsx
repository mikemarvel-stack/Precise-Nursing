'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, ShoppingCart, LogOut } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Precise Nursing
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/documents" className="text-gray-700 hover:text-blue-600">
              Solutions
            </a>
            <a href="/custom-order" className="text-gray-700 hover:text-blue-600">
              Custom Order
            </a>
            <a href="/admin-access" className="text-gray-500 hover:text-blue-600 text-sm">
              Admin
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <a href="/my-orders" className="text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="w-5 h-5" />
                </a>
                <div className="relative group">
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{user.username}</span>
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <a href="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/auth/login">
                  <Button variant="ghost" className="text-gray-900 hover:text-blue-600 font-semibold">Login</Button>
                </a>
                <a href="/auth/register">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">Register</Button>
                </a>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="/documents" className="text-gray-700 hover:text-blue-600">
                Solutions
              </a>
              <a href="/custom-order" className="text-gray-700 hover:text-blue-600">
                Custom Order
              </a>
              <a href="/admin-access" className="text-gray-500 hover:text-blue-600 text-sm">
                Admin
              </a>
              {user ? (
                <>
                  <a href="/my-orders" className="text-gray-700 hover:text-blue-600">
                    My Orders
                  </a>
                  <button onClick={handleLogout} className="text-left text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/auth/login" className="text-gray-900 hover:text-blue-600 font-semibold">
                    Login
                  </a>
                  <a href="/auth/register" className="text-gray-900 hover:text-blue-600 font-semibold">
                    Register
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}