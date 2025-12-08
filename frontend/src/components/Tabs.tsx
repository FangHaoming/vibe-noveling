import { createContext, useContext, useState, ReactNode } from 'react'
import { clsx } from 'clsx'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

interface TabsProps {
  defaultValue: string
  className?: string
  children: ReactNode
}

export function Tabs({ defaultValue, className, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-lg bg-secondary p-1">
      {children}
    </div>
  )
}

export function TabsTrigger({ 
  value, 
  children 
}: { 
  value: string
  children: ReactNode 
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const isActive = context.value === value

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-background/50'
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ 
  value, 
  children 
}: { 
  value: string
  children: ReactNode 
}) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  if (context.value !== value) return null

  return <div className="mt-4">{children}</div>
}

