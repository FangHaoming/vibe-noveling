// 类型定义

export interface Chapter {
  number: number
  title: string
  content: string
  status: 'draft' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface Database {
  chapterNumber: number
  chapterTitle: string
  completedDate: string
  characters: Record<string, any>
  items: Record<string, number>
  skills: Record<string, number>
  relationships: Record<string, any>
  events: string[]
  foreshadowing: {
    new: string[]
    recovered: string[]
  }
}

export interface ItemRecord {
  name: string
  chapter: number
  operation: 'acquired' | 'used' | 'lost'
  quantity: number
  remaining: number
  notes?: string
}

export interface SkillRecord {
  name: string
  chapter: number
  operation: 'acquired' | 'upgraded'
  levelChange: string
  currentLevel: number
  notes?: string
}

export interface RelationshipRecord {
  characterName: string
  chapter: number
  relationshipChange: string
  favorabilityChange: number
  currentFavorability: number
  notes?: string
}

export interface ForeshadowingRecord {
  content: string
  chapterLaid: number
  chapterRecovered?: number
  status: 'unrecovered' | 'recovered' | 'invalid'
  notes?: string
}

export interface TimelineEvent {
  time: string
  description: string
  characters: string[]
  chapter: number
}

