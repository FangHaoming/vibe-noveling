import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { useFileStore } from '../stores/fileStore'
import { aiService } from '../services/aiService'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { getLatestDatabase } = useFileStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // 获取上下文
      const context = await getLatestDatabase()
      
      const response = await aiService.chat({
        message: input,
        context: context || '',
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI 响应错误:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后重试。',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    const actions: Record<string, string> = {
      generate: '请帮我生成下一章内容',
      modify: '请帮我修改当前章节',
      check: '请检查项目的一致性',
    }
    setInput(actions[action] || '')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">AI 助手</h1>
        <p className="text-muted-foreground">
          与 AI 对话，生成或修改章节内容
        </p>
      </div>

      {/* 快捷操作 */}
      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={() => handleQuickAction('generate')}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent"
        >
          ✨ 生成新章节
        </button>
        <button
          onClick={() => handleQuickAction('modify')}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent"
        >
          ✏️ 修改章节
        </button>
        <button
          onClick={() => handleQuickAction('check')}
          className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent"
        >
          ✅ 检查一致性
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto border border-border rounded-lg p-4 mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Sparkles className="h-12 w-12 mb-4 opacity-50" />
            <p>开始与 AI 助手对话吧</p>
            <p className="text-sm mt-2">你可以要求生成章节、修改内容或检查一致性</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div className="text-xs mt-2 opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-lg p-4">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          placeholder="输入你的问题或指令..."
          className="flex-1 min-h-[100px] p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          发送
        </button>
      </div>
    </div>
  )
}

