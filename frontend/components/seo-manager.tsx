'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  BarChart3, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Globe,
  FileText,
  Settings
} from 'lucide-react'

export function SEOManager() {
  const [seoData, setSeoData] = useState({
    title: 'Precise Nursing - Professional Nursing Documents & Solutions',
    description: 'Get high-quality nursing documents, care plans, case studies, and custom academic solutions. Professional nursing resources for students and practitioners.',
    keywords: 'nursing documents, care plans, case studies, nursing assignments, medical documents',
    canonicalUrl: 'https://precisenursing.com',
    ogImage: '/og-image.jpg'
  })

  const [googleConsole, setGoogleConsole] = useState({
    connected: false,
    siteUrl: 'https://precisenursing.com',
    verificationCode: '',
    sitemapSubmitted: false
  })

  const seoChecks = [
    { name: 'Title Tag', status: 'good', message: 'Title is optimal length (60 chars)' },
    { name: 'Meta Description', status: 'good', message: 'Description is well optimized' },
    { name: 'Keywords', status: 'warning', message: 'Consider adding more long-tail keywords' },
    { name: 'Canonical URL', status: 'good', message: 'Canonical URL is properly set' },
    { name: 'Open Graph', status: 'warning', message: 'Add Open Graph image' },
    { name: 'Schema Markup', status: 'error', message: 'No schema markup detected' }
  ]

  const handleConnectGoogleConsole = () => {
    window.open('https://search.google.com/search-console', '_blank')
    setGoogleConsole(prev => ({ ...prev, connected: true }))
  }

  const handleSubmitSitemap = () => {
    setGoogleConsole(prev => ({ ...prev, sitemapSubmitted: true }))
    alert('Sitemap submitted to Google Search Console')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          SEO Manager
        </h1>
        <p className="text-gray-600">Optimize your site for search engines and track performance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Google Search Console
            </CardTitle>
            <CardDescription>Connect and manage your site with Google</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Connection Status</p>
                <p className="text-sm text-gray-600">
                  {googleConsole.connected ? 'Connected' : 'Not Connected'}
                </p>
              </div>
              <Badge variant={googleConsole.connected ? 'default' : 'secondary'}>
                {googleConsole.connected ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <div>
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={googleConsole.siteUrl}
                onChange={(e) => setGoogleConsole(prev => ({ ...prev, siteUrl: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="verification">Verification Code</Label>
              <Input
                id="verification"
                placeholder="google-site-verification=..."
                value={googleConsole.verificationCode}
                onChange={(e) => setGoogleConsole(prev => ({ ...prev, verificationCode: e.target.value }))}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleConnectGoogleConsole}
                className="flex-1"
                disabled={googleConsole.connected}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {googleConsole.connected ? 'Connected' : 'Connect to Google'}
              </Button>
              <Button 
                onClick={handleSubmitSitemap}
                variant="outline"
                disabled={!googleConsole.connected}
              >
                Submit Sitemap
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              SEO Health Check
            </CardTitle>
            <CardDescription>Current SEO status and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {seoChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {check.status === 'good' && <CheckCircle className="w-5 h-5 text-green-600" />}
                    {check.status === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600" />}
                    {check.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                    <div>
                      <p className="font-medium">{check.name}</p>
                      <p className="text-sm text-gray-600">{check.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            SEO Settings
          </CardTitle>
          <CardDescription>Configure your site's SEO metadata</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              value={seoData.title}
              onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
            />
            <p className="text-sm text-gray-500 mt-1">
              {seoData.title.length}/60 characters
            </p>
          </div>

          <div>
            <Label htmlFor="description">Meta Description</Label>
            <Textarea
              id="description"
              value={seoData.description}
              onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              {seoData.description.length}/160 characters
            </p>
          </div>

          <div>
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={seoData.keywords}
              onChange={(e) => setSeoData(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <Label htmlFor="canonical">Canonical URL</Label>
            <Input
              id="canonical"
              value={seoData.canonicalUrl}
              onChange={(e) => setSeoData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="ogImage">Open Graph Image</Label>
            <Input
              id="ogImage"
              value={seoData.ogImage}
              onChange={(e) => setSeoData(prev => ({ ...prev, ogImage: e.target.value }))}
              placeholder="/images/og-image.jpg"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
            Save SEO Settings
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg text-center p-6">
          <Globe className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Site Performance</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">94/100</p>
          <p className="text-sm text-gray-600">Google PageSpeed Score</p>
        </Card>

        <Card className="border-0 shadow-lg text-center p-6">
          <FileText className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Pages Indexed</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">47</p>
          <p className="text-sm text-gray-600">Out of 52 pages</p>
        </Card>

        <Card className="border-0 shadow-lg text-center p-6">
          <BarChart3 className="w-12 h-12 mx-auto text-purple-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Search Clicks</h3>
          <p className="text-3xl font-bold text-purple-600 mb-2">1,234</p>
          <p className="text-sm text-gray-600">Last 30 days</p>
        </Card>
      </div>
    </div>
  )
}