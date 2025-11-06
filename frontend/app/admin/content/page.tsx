'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Save,
  X
} from 'lucide-react'

interface Document {
  id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  fileName?: string
  status: 'draft' | 'published'
  createdAt: string
}

export default function ContentManagerPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Document | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'nursing-assignment',
    level: 'bsn',
    price: 0,
    file: null as File | null,
    image: null as File | null
  })

  const categories = [
    'nursing-assignment', 'case-study', 'care-plan', 
    'research-paper', 'exam-prep', 'clinical-notes'
  ]
  
  const levels = ['lpn', 'rn', 'bsn', 'msn', 'dnp', 'phd-nursing']

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/documents')
      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Failed to load documents:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const docData = {
      id: editingDoc?.id || Date.now().toString(),
      ...formData,
      fileName: formData.file?.name,
      status: 'published' as const,
      createdAt: editingDoc?.createdAt || new Date().toISOString()
    }

    try {
      const response = await fetch('/api/documents', {
        method: editingDoc ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docData)
      })

      if (response.ok) {
        await loadDocuments()
        resetForm()
        alert(editingDoc ? 'Document updated!' : 'Document created!')
      }
    } catch (error) {
      console.error('Failed to save document:', error)
      alert('Failed to save document')
    }
  }

  const handleEdit = (doc: Document) => {
    setEditingDoc(doc)
    setFormData({
      title: doc.title,
      description: doc.description,
      category: doc.category,
      level: doc.level,
      price: doc.price,
      file: null,
      image: null
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await loadDocuments()
        alert('Document deleted!')
      }
    } catch (error) {
      console.error('Failed to delete document:', error)
      alert('Failed to delete document')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'nursing-assignment',
      level: 'bsn',
      price: 0,
      file: null,
      image: null
    })
    setEditingDoc(null)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Content Manager
          </h1>
          <p className="text-gray-600 mt-2">Manage nursing documents and solutions</p>
        </div>
        <Button 
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-green-500 to-green-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Document
        </Button>
      </div>

      {isEditing && (
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingDoc ? 'Edit Document' : 'Add New Document'}</span>
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Document Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="level">Nursing Level *</Label>
                  <select
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="file">Document File</Label>
                  <input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX files only</p>
                </div>
                <div>
                  <Label htmlFor="image">Preview Image (SEO)</Label>
                  <input
                    id="image"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG, WebP for better SEO indexing</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <Save className="w-4 h-4 mr-2" />
                  {editingDoc ? 'Update' : 'Create'} Document
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {documents.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
              <p className="text-gray-600">Create your first nursing document to get started.</p>
            </CardContent>
          </Card>
        ) : (
          documents.map(doc => (
            <Card key={doc.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{doc.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {doc.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • {doc.level.toUpperCase()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'published' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    <span className="text-lg font-bold text-green-600">${doc.price}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4">{doc.description}</p>
                
                {doc.fileName && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    {doc.fileName}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created: {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`/documents/${doc.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(doc)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}