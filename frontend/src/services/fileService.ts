// 文件服务 - 处理文件读写操作
// 注意：在生产环境中，这些操作需要通过后端 API 完成

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export const fileService = {
  /**
   * 读取文件内容
   */
  async readFile(path: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE}/files/${encodeURIComponent(path)}`)
      if (!response.ok) {
        throw new Error(`读取文件失败: ${response.statusText}`)
      }
      const data = await response.json()
      return data.content || ''
    } catch (error) {
      console.error('读取文件错误:', error)
      throw error
    }
  },

  /**
   * 写入文件内容
   */
  async writeFile(path: string, content: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/files/${encodeURIComponent(path)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      })
      if (!response.ok) {
        throw new Error(`写入文件失败: ${response.statusText}`)
      }
    } catch (error) {
      console.error('写入文件错误:', error)
      throw error
    }
  },

  /**
   * 列出目录文件
   */
  async listFiles(dir: string): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE}/files/list/${encodeURIComponent(dir)}`)
      if (!response.ok) {
        throw new Error(`列出文件失败: ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('列出文件错误:', error)
      throw error
    }
  },

  /**
   * 获取最新的 database 文件编号
   */
  async getLatestDatabaseNumber(): Promise<number> {
    try {
      const files = await this.listFiles('prompts/database')
      const dbFiles = files.filter(f => f.startsWith('database_') && f.endsWith('.md'))
      if (dbFiles.length === 0) return 0
      
      const numbers = dbFiles
        .map(f => parseInt(f.match(/database_(\d+)\.md/)?.[1] || '0'))
        .filter(n => !isNaN(n))
      
      return Math.max(...numbers, 0)
    } catch (error) {
      console.error('获取最新 database 编号错误:', error)
      return 0
    }
  },
}

