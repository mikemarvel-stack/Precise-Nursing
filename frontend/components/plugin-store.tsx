'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Download, ExternalLink, Shield, Search, BarChart3 } from 'lucide-react'

const pluginRepositories = [
  {
    name: 'WordPress Plugin Directory',
    url: 'https://wordpress.org/plugins/',
    type: 'wordpress',
    description: 'Official WordPress plugin repository with 60,000+ plugins'
  },
  {
    name: 'NPM Registry',
    url: 'https://www.npmjs.com/',
    type: 'npm',
    description: 'Node.js package registry with React/Next.js components'
  },
  {
    name: 'Chrome Web Store',
    url: 'https://chrome.google.com/webstore/',
    type: 'chrome',
    description: 'Browser extensions and web apps'
  },
  {
    name: 'GitHub Marketplace',
    url: 'https://github.com/marketplace',
    type: 'github',
    description: 'Developer tools and integrations'
  }
]

const featuredPlugins = [
  {
    id: 'google-search-console',
    name: 'Google Search Console',
    version: '2.1.0',
    description: 'Connect your site to Google Search Console for SEO insights and indexing',
    author: 'Google',
    category: 'seo',
    rating: 4.9,
    downloads: 2500000,
    price: 'Free',
    features: ['Search Analytics', 'Index Coverage', 'URL Inspection', 'Sitemap Submission'],
    installUrl: 'https://search.google.com/search-console',
    icon: <Search className="w-8 h-8 text-blue-600" />
  },
  {
    id: 'yoast-seo',
    name: 'Yoast SEO Alternative',
    version: '1.8.5',
    description: 'Complete SEO optimization with meta tags, schema markup, and content analysis',
    author: 'SEO Tools',
    category: 'seo',
    rating: 4.7,
    downloads: 1800000,
    price: 'Free',
    features: ['Meta Tags', 'Schema Markup', 'Content Analysis', 'XML Sitemaps'],
    installUrl: 'npm install next-seo',
    icon: <BarChart3 className="w-8 h-8 text-green-600" />
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    version: '4.0.0',
    description: 'Track user behavior, conversions, and site performance',
    author: 'Google',
    category: 'analytics',
    rating: 4.8,
    downloads: 3200000,
    price: 'Free',
    features: ['User Tracking', 'Conversion Goals', 'Real-time Data', 'Custom Events'],
    installUrl: 'https://analytics.google.com',
    icon: <BarChart3 className="w-8 h-8 text-orange-600" />
  },
  {
    id: 'google-tag-manager',
    name: 'Google Tag Manager',
    version: '2.0.3',
    description: 'Manage tracking codes and marketing tags without code changes',
    author: 'Google',
    category: 'analytics',
    rating: 4.6,
    downloads: 1500000,
    price: 'Free',
    features: ['Tag Management', 'Event Tracking', 'Conversion Tracking', 'A/B Testing'],
    installUrl: 'https://tagmanager.google.com',
    icon: <Shield className="w-8 h-8 text-purple-600" />
  }
]

const categories = [
  { id: 'seo', label: 'SEO & Search', count: 12 },
  { id: 'analytics', label: 'Analytics', count: 8 },
  { id: 'security', label: 'Security', count: 15 },
  { id: 'performance', label: 'Performance', count: 10 },
  { id: 'marketing', label: 'Marketing', count: 6 }
]

export function PluginStore() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleInstallPlugin = (plugin: any) => {
    if (plugin.installUrl.startsWith('http')) {
      window.open(plugin.installUrl, '_blank')
    } else {
      navigator.clipboard.writeText(plugin.installUrl)
      alert(`Installation command copied: ${plugin.installUrl}`)
    }
  }

  const searchRepository = (repo: any) => {
    const searchUrls = {
      wordpress: `${repo.url}search/healthcare/`,
      npm: `${repo.url}search?q=healthcare%20nursing`,
      chrome: `${repo.url}category/productivity`,
      github: `${repo.url}type:apps+healthcare`
    }
    window.open(searchUrls[repo.type as keyof typeof searchUrls] || repo.url, '_blank')
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Plugin Store
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Extend your Precise Nursing platform with powerful plugins and integrations
        </p>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
        >
          All Plugins
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label} ({category.count})
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredPlugins.map(plugin => (
          <Card key={plugin.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {plugin.icon}
                  <div>
                    <CardTitle className="text-lg">{plugin.name}</CardTitle>
                    <CardDescription>v{plugin.version} by {plugin.author}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {plugin.price}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700">{plugin.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {plugin.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {(plugin.downloads / 1000000).toFixed(1)}M
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {plugin.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                onClick={() => handleInstallPlugin(plugin)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Install Plugin
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Third-Party Plugin Repositories
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pluginRepositories.map((repo, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow-sm border">
                  <h4 className="font-bold text-lg mb-2">{repo.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{repo.description}</p>
                  <Button 
                    onClick={() => searchRepository(repo)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Browse {repo.name}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Plugin?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our development team can create custom plugins 
              tailored to your specific needs.
            </p>
            <Button 
              onClick={() => window.open('mailto:writerprecise@gmail.com?subject=Custom Plugin Request')}
              className="bg-gradient-to-r from-green-500 to-green-600"
            >
              Request Custom Plugin
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}