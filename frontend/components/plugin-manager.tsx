'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Trash2, Settings, Star, Shield, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePluginStore } from '@/stores/plugin-store'
import { Plugin, PluginCategory } from '@/types/plugin'
import { cn } from '@/lib/utils'

const categories: { id: PluginCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'ui-components', label: 'UI Components', icon: <Package className="w-4 h-4" /> },
  { id: 'healthcare', label: 'Healthcare', icon: <Shield className="w-4 h-4" /> },
  { id: 'data-visualization', label: 'Data Viz', icon: <Star className="w-4 h-4" /> },
  { id: 'authentication', label: 'Auth', icon: <Shield className="w-4 h-4" /> },
  { id: 'payment', label: 'Payment', icon: <Package className="w-4 h-4" /> },
  { id: 'analytics', label: 'Analytics', icon: <Star className="w-4 h-4" /> },
]

// Simulated internet plugin sources
const pluginSources = [
  'https://registry.npmjs.org',
  'https://plugins.precisenursing.com',
  'https://healthcare-plugins.org'
]

const mockPlugins: Plugin[] = [
  {
    id: 'stripe-payments',
    name: 'Stripe Payments',
    version: '2.1.0',
    description: 'Accept payments with Stripe integration',
    author: 'PreciseNursing Team',
    category: 'payment',
    license: 'MIT',
    keywords: ['payment', 'stripe', 'billing'],
    main: 'index.js',
    permissions: ['network-access', 'write-data'],
    status: 'available',
    downloads: 15420,
    rating: 4.8,
    size: 2048000
  },
  {
    id: 'patient-dashboard',
    name: 'Patient Dashboard',
    version: '1.5.2',
    description: 'Advanced patient management dashboard',
    author: 'HealthTech Solutions',
    category: 'healthcare',
    license: 'MIT',
    keywords: ['patient', 'dashboard', 'healthcare'],
    main: 'dashboard.js',
    permissions: ['read-data', 'write-data'],
    status: 'available',
    downloads: 8930,
    rating: 4.6,
    size: 5120000
  },
  {
    id: 'chart-components',
    name: 'Medical Charts',
    version: '3.0.1',
    description: 'Beautiful chart components for medical data',
    author: 'DataViz Pro',
    category: 'data-visualization',
    license: 'Apache-2.0',
    keywords: ['charts', 'visualization', 'medical'],
    main: 'charts.js',
    permissions: ['read-data'],
    status: 'available',
    downloads: 12340,
    rating: 4.9,
    size: 3072000
  }
]

export function PluginManager() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<PluginCategory | 'all'>('all')
  const [view, setView] = useState<'browse' | 'installed'>('browse')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Plugin[]>([])
  const [mounted, setMounted] = useState(false)
  
  const {
    plugins,
    installedPlugins,
    activePlugins,
    installPlugin,
    uninstallPlugin,
    togglePlugin,
    addPlugin
  } = usePluginStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Load mock plugins on mount only once
    if (mounted && plugins.length === 0) {
      mockPlugins.forEach(plugin => {
        addPlugin(plugin)
      })
    }
  }, [mounted, plugins.length, addPlugin])

  if (!mounted) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plugin.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory
    const matchesView = view === 'browse' || installedPlugins.has(plugin.id)
    
    return matchesSearch && matchesCategory && matchesView
  })

  const searchInternetPlugins = async (query: string) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    try {
      // Simulate API call to search internet sources
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const results = mockPlugins.filter(plugin => 
        plugin.name.toLowerCase().includes(query.toLowerCase()) ||
        plugin.description.toLowerCase().includes(query.toLowerCase()) ||
        plugin.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
      )
      
      setSearchResults(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleInstall = async (plugin: Plugin) => {
    try {
      // Simulate downloading from internet source
      const updatedPlugin = { ...plugin, status: 'installing' as const }
      addPlugin(updatedPlugin)
      
      // Simulate installation process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      await installPlugin({ ...plugin, status: 'available' })
    } catch (error) {
      console.error('Installation failed:', error)
    }
  }

  const handleUninstall = async (pluginId: string) => {
    try {
      await uninstallPlugin(pluginId)
    } catch (error) {
      console.error('Uninstallation failed:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Plugin Manager</h1>
        <div className="flex gap-2">
          <Button
            variant={view === 'browse' ? 'default' : 'outline'}
            onClick={() => setView('browse')}
          >
            Browse
          </Button>
          <Button
            variant={view === 'installed' ? 'default' : 'outline'}
            onClick={() => setView('installed')}
          >
            Installed ({installedPlugins.size})
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search plugins from internet sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchInternetPlugins(searchQuery)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button 
          onClick={() => searchInternetPlugins(searchQuery)}
          disabled={isSearching}
          className="bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {isSearching ? 'Searching...' : 'Search Internet'}
        </Button>
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
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.label}
          </Button>
        ))}
      </div>

      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Internet Search Results</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((plugin, index) => (
              <Card key={`search-${plugin.id}-${index}`} className="flex flex-col border-blue-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plugin.name}</CardTitle>
                      <CardDescription>v{plugin.version} by {plugin.author}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {plugin.rating}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {plugin.keywords.slice(0, 3).map((keyword, keywordIndex) => (
                      <span
                        key={`search-${plugin.id}-${keyword}-${keywordIndex}`}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>{plugin.downloads?.toLocaleString()} downloads</span>
                    <span>{plugin.size ? `${(plugin.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}</span>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleInstall(plugin)}
                    disabled={plugin.status === 'installing' || installedPlugins.has(plugin.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {installedPlugins.has(plugin.id) ? 'Installed' : 
                     plugin.status === 'installing' ? 'Installing...' : 'Install from Internet'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlugins.map((plugin, index) => (
          <Card key={`${plugin.id}-${index}`} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plugin.name}</CardTitle>
                  <CardDescription>v{plugin.version} by {plugin.author}</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {plugin.rating}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">{plugin.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {plugin.keywords.slice(0, 3).map((keyword, keywordIndex) => (
                  <span
                    key={`${plugin.id}-${keyword}-${keywordIndex}-${index}`}
                    className="px-2 py-1 text-xs bg-secondary rounded-md"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{plugin.downloads?.toLocaleString()} downloads</span>
                <span>{plugin.size ? `${(plugin.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}</span>
              </div>

              <div className="flex gap-2">
                {installedPlugins.has(plugin.id) ? (
                  <>
                    <Button
                      size="sm"
                      variant={activePlugins.has(plugin.id) ? 'default' : 'outline'}
                      onClick={() => togglePlugin(plugin.id)}
                      className="flex-1"
                    >
                      {activePlugins.has(plugin.id) ? 'Enabled' : 'Enable'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUninstall(plugin.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleInstall(plugin)}
                    disabled={plugin.status === 'installing'}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {plugin.status === 'installing' ? 'Installing...' : 'Install'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlugins.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No plugins found</h3>
          <p className="text-muted-foreground">
            {view === 'installed' 
              ? "You haven't installed any plugins yet."
              : "Try adjusting your search or category filter."
            }
          </p>
        </div>
      )}
    </div>
  )
}