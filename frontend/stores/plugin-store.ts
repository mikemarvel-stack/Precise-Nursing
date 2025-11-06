import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Plugin, PluginStore, PluginStatus } from '@/types/plugin'

interface PluginStoreState {
  plugins: Plugin[]
  stores: PluginStore[]
  installedPlugins: Set<string>
  activePlugins: Set<string>
  
  // Actions
  addPlugin: (plugin: Plugin) => void
  removePlugin: (pluginId: string) => void
  updatePlugin: (pluginId: string, updates: Partial<Plugin>) => void
  togglePlugin: (pluginId: string) => void
  installPlugin: (plugin: Plugin) => Promise<void>
  uninstallPlugin: (pluginId: string) => Promise<void>
  updatePluginStatus: (pluginId: string, status: PluginStatus) => void
  addStore: (store: PluginStore) => void
  removeStore: (storeId: string) => void
  searchPlugins: (query: string) => Plugin[]
  getPluginsByCategory: (category: string) => Plugin[]
}

export const usePluginStore = create<PluginStoreState>()(
  persist(
    (set, get) => ({
      plugins: [],
      stores: [
        {
          id: 'official',
          name: 'Official Plugin Store',
          url: 'https://plugins.precisenursing.com',
          description: 'Official verified plugins for PreciseNursing',
          verified: true,
          plugins: []
        },
        {
          id: 'community',
          name: 'Community Store',
          url: 'https://community.precisenursing.com/plugins',
          description: 'Community-contributed plugins',
          verified: false,
          plugins: []
        }
      ],
      installedPlugins: new Set(),
      activePlugins: new Set(),

      addPlugin: (plugin) => set((state) => ({
        plugins: [...state.plugins, plugin]
      })),

      removePlugin: (pluginId) => set((state) => ({
        plugins: state.plugins.filter(p => p.id !== pluginId),
        installedPlugins: new Set([...state.installedPlugins].filter(id => id !== pluginId)),
        activePlugins: new Set([...state.activePlugins].filter(id => id !== pluginId))
      })),

      updatePlugin: (pluginId, updates) => set((state) => ({
        plugins: state.plugins.map(p => 
          p.id === pluginId ? { ...p, ...updates } : p
        )
      })),

      togglePlugin: (pluginId) => set((state) => {
        const newActivePlugins = new Set(state.activePlugins)
        if (newActivePlugins.has(pluginId)) {
          newActivePlugins.delete(pluginId)
        } else {
          newActivePlugins.add(pluginId)
        }
        return { activePlugins: newActivePlugins }
      }),

      installPlugin: async (plugin) => {
        const { updatePluginStatus, addPlugin } = get()
        
        try {
          updatePluginStatus(plugin.id, 'installing')
          
          // Simulate installation process
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          const installedPlugin = {
            ...plugin,
            status: 'installed' as PluginStatus,
            installDate: new Date()
          }
          
          addPlugin(installedPlugin)
          
          set((state) => ({
            installedPlugins: new Set([...state.installedPlugins, plugin.id])
          }))
          
        } catch (error) {
          updatePluginStatus(plugin.id, 'error')
          throw error
        }
      },

      uninstallPlugin: async (pluginId) => {
        const { removePlugin } = get()
        
        try {
          // Simulate uninstallation
          await new Promise(resolve => setTimeout(resolve, 1000))
          removePlugin(pluginId)
        } catch (error) {
          console.error('Failed to uninstall plugin:', error)
          throw error
        }
      },

      updatePluginStatus: (pluginId, status) => set((state) => ({
        plugins: state.plugins.map(p => 
          p.id === pluginId ? { ...p, status } : p
        )
      })),

      addStore: (store) => set((state) => ({
        stores: [...state.stores, store]
      })),

      removeStore: (storeId) => set((state) => ({
        stores: state.stores.filter(s => s.id !== storeId)
      })),

      searchPlugins: (query) => {
        const { plugins } = get()
        const lowercaseQuery = query.toLowerCase()
        return plugins.filter(plugin => 
          plugin.name.toLowerCase().includes(lowercaseQuery) ||
          plugin.description.toLowerCase().includes(lowercaseQuery) ||
          plugin.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery))
        )
      },

      getPluginsByCategory: (category) => {
        const { plugins } = get()
        return plugins.filter(plugin => plugin.category === category)
      }
    }),
    {
      name: 'plugin-store',
      partialize: (state) => ({
        installedPlugins: Array.from(state.installedPlugins),
        activePlugins: Array.from(state.activePlugins),
        stores: state.stores
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.installedPlugins = new Set(state.installedPlugins as any)
          state.activePlugins = new Set(state.activePlugins as any)
        }
      }
    }
  )
)