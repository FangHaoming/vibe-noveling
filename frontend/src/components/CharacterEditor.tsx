import { useState, useEffect } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import { fileService } from '../services/fileService'

export default function CharacterEditor() {
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    loadFile()
  }, [])

  const loadFile = async () => {
    try {
      const data = await fileService.readFile('prompts/characters.md')
      setContent(data)
    } catch (error) {
      console.error('加载文件失败:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await fileService.writeFile('prompts/characters.md', content)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('保存失败:', error)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          编辑角色设定文件 (prompts/characters.md)
        </p>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? '保存中...' : saved ? '已保存' : '保存'}
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[600px] p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder="在此编辑角色设定..."
      />
    </div>
  )
}

