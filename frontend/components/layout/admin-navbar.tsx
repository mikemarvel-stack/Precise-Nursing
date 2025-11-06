'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, Settings, Package, BarChart3, Users, Home, Search, Store, FileText } from 'lucide-react'

export function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/admin/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Precise Nursing Admin
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </a>
            <a href="/admin/orders" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Orders
            </a>
            <a href="/admin/content" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </a>
            <a href="/admin/plugins" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Plugins
            </a>
            <a href="/admin/plugins/store" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Store className="w-4 h-4" />
              Plugin Store
            </a>
            <a href="/admin/seo" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Search className="w-4 h-4" />
              SEO Manager
            </a>
            <a href="/admin/settings" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </a>
            <a href="/admin/analytics" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => window.open('/admin', '_blank')} variant="outline">
              Strapi Admin
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="ghost">
              Back to Site
            </Button>
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
              <a href="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </a>
              <a href="/admin/orders" className="text-gray-700 hover:text-blue-600">
                Orders
              </a>
              <a href="/admin/content" className="text-gray-700 hover:text-blue-600">
                Content
              </a>
              <a href="/admin/plugins" className="text-gray-700 hover:text-blue-600">
                Plugins
              </a>
              <a href="/admin/plugins/store" className="text-gray-700 hover:text-blue-600">
                Plugin Store
              </a>
              <a href="/admin/seo" className="text-gray-700 hover:text-blue-600">
                SEO Manager
              </a>
              <a href="/admin/settings" className="text-gray-700 hover:text-blue-600">
                Settings
              </a>
              <a href="/admin/analytics" className="text-gray-700 hover:text-blue-600">
                Analytics
              </a>
              <a href="/" className="text-gray-700 hover:text-blue-600">
                Back to Site
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}