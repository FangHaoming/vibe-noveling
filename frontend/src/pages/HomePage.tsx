import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, MessageSquare, Settings } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">欢迎使用 Vibe-Noveling</h1>
        <p className="text-lg text-muted-foreground">
          AI 辅助小说创作工具，帮助你管理项目、生成内容、保持一致性
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/config"
          className="p-6 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <Settings className="h-8 w-8 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">配置管理</h2>
          <p className="text-muted-foreground mb-4">
            设置世界观、角色、大纲等基础信息
          </p>
          <span className="text-primary flex items-center gap-2">
            开始配置 <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <Link
          to="/ai"
          className="p-6 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <MessageSquare className="h-8 w-8 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">AI 助手</h2>
          <p className="text-muted-foreground mb-4">
            与 AI 对话，生成或修改章节内容
          </p>
          <span className="text-primary flex items-center gap-2">
            开始对话 <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <Link
          to="/chapters"
          className="p-6 border border-border rounded-lg hover:bg-accent transition-colors"
        >
          <BookOpen className="h-8 w-8 mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">章节管理</h2>
          <p className="text-muted-foreground mb-4">
            查看和管理所有章节，编辑内容
          </p>
          <span className="text-primary flex items-center gap-2">
            查看章节 <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-secondary rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">快速开始</h2>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>在"配置管理"中填写世界观、角色、大纲等基础信息</li>
          <li>在"AI 助手"中与 AI 对话，生成第一章内容</li>
          <li>系统会自动更新 database 和列表文件</li>
          <li>继续使用 AI 助手生成后续章节</li>
        </ol>
      </div>
    </div>
  )
}

