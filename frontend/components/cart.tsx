'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CartItem {
  id: number
  title: string
  price: number
  category: string
  quantity: number
}

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (items: CartItem[]) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/auth/login?redirect=/checkout'
    } else {
      window.location.href = '/checkout'
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Cart
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {getTotalItems()}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
          <Card className="border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Shopping Cart</span>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.category}</p>
                          <p className="text-sm font-bold text-green-600">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{getTotalItems()} items</span>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export const useCart = () => {
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const savedCart = localStorage.getItem('cart')
    const cartItems = savedCart ? JSON.parse(savedCart) : []
    
    const existingItem = cartItems.find((cartItem: CartItem) => cartItem.id === item.id)
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem: CartItem) => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } else {
      const updatedCart = [...cartItems, { ...item, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
  }

  return { addToCart }
}