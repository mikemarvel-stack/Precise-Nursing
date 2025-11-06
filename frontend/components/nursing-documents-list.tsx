'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, ShoppingCart, Eye, Star } from 'lucide-react'

interface NursingDocument {
  id: number
  title: string
  description: string
  price: number
  category: string
  nursingLevel: string
  subject: string
  pages: number
  featured: boolean
  rating: number
  downloads: number
}

interface Props {
  featured?: boolean
  limit?: number
}

export function NursingDocumentsList({ featured = false, limit }: Props) {
  const [documents, setDocuments] = useState<NursingDocument[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['nursing-assignment', 'case-study', 'care-plan', 'research-paper', 'exam-prep', 'clinical-notes']

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      
      // Transform admin documents to user format
      let docs = data.map((doc: any) => ({
        id: parseInt(doc.id),
        title: doc.title,
        description: doc.description,
        price: doc.price,
        category: doc.category,
        nursingLevel: doc.level,
        subject: doc.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        pages: Math.floor(Math.random() * 10) + 5, // Mock pages
        featured: Math.random() > 0.7, // Random featured
        rating: 4.5 + Math.random() * 0.5,
        downloads: Math.floor(Math.random() * 2000) + 500
      }))
      
      if (featured) {
        docs = docs.filter((doc: any) => doc.featured)
      }
      
      if (limit) {
        docs = docs.slice(0, limit)
      }
      
      setDocuments(docs)
    } catch (error) {
      console.error('Failed to fetch documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handlePurchase = (docId: number) => {
    const isLoggedIn = localStorage.getItem('token')
    if (!isLoggedIn) {
      window.location.href = '/auth/login?redirect=/documents/' + docId
    } else {
      window.location.href = '/payment?document=' + docId
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading nursing documents...</div>
  }

  return (
    <div className="space-y-6">
      {!featured && (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search nursing documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {doc.subject} • {doc.pages} pages
                  </CardDescription>
                </div>
                {doc.featured && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                    ⭐ Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline">
                  {doc.category.replace('-', ' ')}
                </Badge>
                <Badge variant="outline">
                  {doc.nursingLevel?.toUpperCase()}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {doc.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {doc.rating || 4.5}
                </div>
                <span>{doc.downloads || 0} downloads</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  ${doc.price}
                </span>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handlePurchase(doc.id)}
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
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

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  )
}