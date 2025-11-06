'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, ShoppingCart, Eye, Download } from 'lucide-react'

interface AcademicContent {
  id: number
  title: string
  description: string
  price: number
  category: string
  academicLevel: string
  subject: string
  pages: number
  featured: boolean
  slug: string
  previewFile?: any
}

export function AcademicContentList() {
  const [contents, setContents] = useState<AcademicContent[]>([])
  const [filteredContents, setFilteredContents] = useState<AcademicContent[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['nursing-assignment', 'case-study', 'care-plan', 'research-paper', 'exam-prep', 'clinical-notes', 'nursing-essay']
  const levels = ['lpn', 'rn', 'bsn', 'msn', 'dnp', 'phd-nursing']

  useEffect(() => {
    fetchContents()
  }, [])

  useEffect(() => {
    filterContents()
  }, [contents, searchQuery, selectedCategory, selectedLevel])

  const fetchContents = async () => {
    try {
      const response = await fetch('/api/academic-contents?populate=*')
      const data = await response.json()
      setContents(data.data || [])
    } catch (error) {
      console.error('Failed to fetch contents:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterContents = () => {
    let filtered = contents

    if (searchQuery) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(content => content.category === selectedCategory)
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(content => content.academicLevel === selectedLevel)
    }

    setFilteredContents(filtered)
  }

  const handlePurchase = async (contentId: number) => {
    const customerName = prompt('Enter your name:')
    const customerEmail = prompt('Enter your email:')
    
    if (!customerName || !customerEmail) return

    try {
      const response = await fetch(`/api/academic-contents/${contentId}/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, customerEmail })
      })

      const data = await response.json()
      
      if (data.clientSecret) {
        // Redirect to payment page or integrate Stripe Elements
        window.location.href = `/payment?client_secret=${data.clientSecret}&order_id=${data.orderId}`
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      alert('Purchase failed. Please try again.')
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading academic content...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">Nursing Documents & Assignments</h1>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Levels</option>
          {levels.map(level => (
            <option key={level} value={level}>
              {level.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContents.map((content) => (
          <Card key={content.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{content.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {content.subject} • {content.pages} pages
                  </CardDescription>
                </div>
                {content.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <div className="flex gap-2 mb-4">
                <Badge variant="outline">
                  {content.category.replace('-', ' ')}
                </Badge>
                <Badge variant="outline">
                  {content.academicLevel.replace('-', ' ')}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {content.description}
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${content.price}
                  </span>
                </div>

                <div className="flex gap-2">
                  {content.previewFile && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                  <Button 
                    onClick={() => handlePurchase(content.id)}
                    className="flex-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No content found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  )
}