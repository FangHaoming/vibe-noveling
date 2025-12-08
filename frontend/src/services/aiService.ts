// AI 服务 - 处理与 AI 的交互

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequest {
  message: string
  context?: string
  chapterNumber?: number
}

interface ChatResponse {
  content: string
  updates?: {
    files: string[]
    actions: string[]
  }
}

export const aiService = {
  /**
   * 发送聊天消息
   */
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`AI 响应失败: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('AI 聊天错误:', error)
      throw error
    }
  },

  /**
   * 生成章节
   */
  async generateChapter(chapterNumber: number, context?: string): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE}/ai/generate-chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterNumber,
          context,
        }),
      })

      if (!response.ok) {
        throw new Error(`生成章节失败: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('生成章节错误:', error)
      throw error
    }
  },

  /**
   * 修改章节
   */
  async modifyChapter(
    chapterNumber: number,
    modifications: string,
    context?: string
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE}/ai/modify-chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chapterNumber,
          modifications,
          context,
        }),
      })

      if (!response.ok) {
        throw new Error(`修改章节失败: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('修改章节错误:', error)
      throw error
    }
  },

  /**
   * 检查一致性
   */
  async checkConsistency(): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE}/ai/check-consistency`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`检查一致性失败: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('检查一致性错误:', error)
      throw error
    }
  },
}

