import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Settings, 
  MessageSquare, 
  BookOpen, 
  Database, 
  Clock as TimelineIcon 
} from 'lucide-react'
import { clsx } from 'clsx'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/config', label: '配置管理', icon: Settings },
    { path: '/ai', label: 'AI 助手', icon: MessageSquare },
    { path: '/chapters', label: '章节管理', icon: BookOpen },
    { path: '/database', label: '数据库', icon: Database },
    { path: '/timeline', label: '时间线', icon: TimelineIcon },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* 左侧导航栏 */}
      <aside className="w-64 border-r border-border bg-secondary/50 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Vibe-Noveling</h1>
          <p className="text-sm text-muted-foreground">AI 小说创作助手</p>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

