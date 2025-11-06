'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/documents', label: 'Documents' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Precise Nursing
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-600">
                <User className="w-5 h-5 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/cart">
              <Button>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
              <span className="sr-only">Open menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
          <div className="flex flex-col space-y-2 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:bg-gray-100 hover:text-blue-600 rounded-md px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-4 mt-2 flex flex-col space-y-2">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-5 h-5 mr-2" />
                  Login
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}