import { create } from 'zustand'
import { fileService } from '../services/fileService'

interface FileStore {
  latestDatabase: string | null
  loading: boolean
  loadLatestDatabase: () => Promise<void>
  getLatestDatabase: () => Promise<string | null>
}

export const useFileStore = create<FileStore>((set, get) => ({
  latestDatabase: null,
  loading: false,

  loadLatestDatabase: async () => {
    set({ loading: true })
    try {
      const number = await fileService.getLatestDatabaseNumber()
      if (number > 0) {
        const content = await fileService.readFile(`prompts/database/database_${String(number).padStart(3, '0')}.md`)
        set({ latestDatabase: content, loading: false })
      } else {
        set({ latestDatabase: null, loading: false })
      }
    } catch (error) {
      console.error('加载最新 database 失败:', error)
      set({ loading: false })
    }
  },

  getLatestDatabase: async () => {
    const { latestDatabase } = get()
    if (latestDatabase) {
      return latestDatabase
    }
    await get().loadLatestDatabase()
    return get().latestDatabase
  },
}))

