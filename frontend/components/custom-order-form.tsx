'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Upload, Calendar, FileText, DollarSign } from 'lucide-react'

export function CustomOrderForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    nursingLevel: '',
    subject: '',
    pages: 1,
    deadline: '',
    instructions: '',
    customerName: '',
    customerEmail: ''
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [submitting, setSubmitting] = useState(false)

  const categories = ['nursing-assignment', 'case-study', 'care-plan', 'research-paper', 'exam-prep', 'clinical-notes', 'nursing-essay']
  const levels = ['lpn', 'rn', 'bsn', 'msn', 'dnp', 'phd-nursing']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const calculateEstimatedPrice = () => {
    const basePrice = 20
    const levelMultiplier = {
      'lpn': 1,
      'rn': 1.2,
      'bsn': 1.4,
      'msn': 1.8,
      'dnp': 2.2,
      'phd-nursing': 2.5
    }
    const categoryMultiplier = {
      'nursing-assignment': 1,
      'case-study': 1.3,
      'care-plan': 1.2,
      'research-paper': 1.5,
      'exam-prep': 0.8,
      'clinical-notes': 0.9,
      'nursing-essay': 1.1
    }

    const level = levelMultiplier[formData.nursingLevel as keyof typeof levelMultiplier] || 1
    const category = categoryMultiplier[formData.category as keyof typeof categoryMultiplier] || 1
    
    return Math.round(basePrice * formData.pages * level * category)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formDataToSend = new FormData()
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString())
      })

      attachments.forEach((file, index) => {
        formDataToSend.append(`attachments`, file)
      })

      const response = await fetch('/api/custom-orders', {
        method: 'POST',
        body: formDataToSend
      })

      if (response.ok) {
        alert('Custom order submitted successfully! You will receive a quote within 24 hours.')
        setFormData({
          title: '',
          description: '',
          category: '',
          nursingLevel: '',
          subject: '',
          pages: 1,
          deadline: '',
          instructions: '',
          customerName: '',
          customerEmail: ''
        })
        setAttachments([])
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-900">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            Custom Academic Solution
          </CardTitle>
          <CardDescription className="text-lg text-gray-700 font-medium">
            Get a personalized quote for your nursing academic needs
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Your Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Email Address *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-gray-800">Project Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter your project title"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="" className="text-gray-500">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="text-gray-900">
                      {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Nursing Level *</label>
                <select
                  name="nursingLevel"
                  value={formData.nursingLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                >
                  <option value="" className="text-gray-500">Select level</option>
                  {levels.map(level => (
                    <option key={level} value={level} className="text-gray-900">
                      {level.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="e.g., Medical-Surgical Nursing"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Number of Pages *</label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-gray-800">Deadline *</label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-gray-800">Project Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200 resize-none"
                placeholder="Provide a detailed description of your project requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-gray-800">Additional Instructions</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium bg-white/80 backdrop-blur-sm transition-all duration-200 resize-none"
                placeholder="Any specific formatting, citation style, or additional requirements..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-3 text-gray-800">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">Upload files</span>
                  <span className="text-gray-500"> or drag and drop</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  PDF, DOC, DOCX up to 10MB each
                </p>
              </div>
              {attachments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium">Attached files:</p>
                  <ul className="text-sm text-gray-600">
                    {attachments.map((file, index) => (
                      <li key={index}>• {file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {formData.category && formData.nursingLevel && formData.pages > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Estimated Price</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${calculateEstimatedPrice()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Final price will be provided in your personalized quote
                  </p>
                </CardContent>
              </Card>
            )}

            <Button 
              type="submit" 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Submitting...' : 'Submit Custom Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}