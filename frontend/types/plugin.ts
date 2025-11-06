export interface Plugin {
  id: string
  name: string
  version: string
  description: string
  author: string
  category: PluginCategory
  icon?: string
  homepage?: string
  repository?: string
  license: string
  keywords: string[]
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  main: string
  exports?: Record<string, any>
  config?: PluginConfig
  permissions: PluginPermission[]
  status: PluginStatus
  installDate?: Date
  updateDate?: Date
  size?: number
  downloads?: number
  rating?: number
  reviews?: PluginReview[]
}

export interface PluginConfig {
  settings?: Record<string, any>
  theme?: {
    colors?: Record<string, string>
    fonts?: Record<string, string>
  }
  features?: string[]
}

export interface PluginReview {
  id: string
  userId: string
  username: string
  rating: number
  comment: string
  date: Date
}

export type PluginCategory = 
  | 'ui-components'
  | 'data-visualization'
  | 'authentication'
  | 'payment'
  | 'analytics'
  | 'communication'
  | 'productivity'
  | 'healthcare'
  | 'utilities'
  | 'themes'

export type PluginStatus = 
  | 'installed'
  | 'available'
  | 'updating'
  | 'installing'
  | 'error'
  | 'disabled'

export type PluginPermission = 
  | 'read-data'
  | 'write-data'
  | 'network-access'
  | 'file-system'
  | 'notifications'
  | 'camera'
  | 'microphone'
  | 'location'

export interface PluginStore {
  id: string
  name: string
  url: string
  description: string
  verified: boolean
  plugins: Plugin[]
}

export interface PluginManifest {
  manifest_version: number
  name: string
  version: string
  description: string
  permissions: PluginPermission[]
  content_scripts?: {
    matches: string[]
    js: string[]
    css?: string[]
  }[]
  background?: {
    scripts: string[]
    persistent: boolean
  }
  web_accessible_resources?: string[]
}