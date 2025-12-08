import express from 'express'
import { readFile, writeFile, readdir } from 'fs/promises'
import { join, resolve, relative } from 'path'
import { existsSync } from 'fs'

const router = express.Router()

// 项目根目录（相对于 backend 目录）
// 在 Docker 环境中，工作目录是 /app/backend，项目根目录是 /app
// 在本地开发环境中，工作目录是 backend，项目根目录是 backend 的上一级
const PROJECT_ROOT = process.env.PROJECT_ROOT 
  ? resolve(process.env.PROJECT_ROOT)
  : resolve(process.cwd(), '..')

// 验证路径安全性
function validatePath(filePath: string): boolean {
  const resolved = resolve(PROJECT_ROOT, filePath)
  const relativePath = relative(PROJECT_ROOT, resolved)
  return !relativePath.startsWith('..') && !relativePath.includes('node_modules')
}

// 读取文件
router.get('/:path(*)', async (req, res) => {
  try {
    const filePath = req.params.path
    if (!validatePath(filePath)) {
      return res.status(400).json({ error: '无效的文件路径' })
    }

    const fullPath = join(PROJECT_ROOT, filePath)
    if (!existsSync(fullPath)) {
      return res.status(404).json({ error: '文件不存在' })
    }

    const content = await readFile(fullPath, 'utf-8')
    res.json({ content })
  } catch (error) {
    console.error('读取文件错误:', error)
    res.status(500).json({ error: '读取文件失败' })
  }
})

// 写入文件
router.post('/:path(*)', async (req, res) => {
  try {
    const filePath = req.params.path
    const { content } = req.body

    if (!validatePath(filePath)) {
      return res.status(400).json({ error: '无效的文件路径' })
    }

    if (typeof content !== 'string') {
      return res.status(400).json({ error: '内容必须是字符串' })
    }

    const fullPath = join(PROJECT_ROOT, filePath)
    await writeFile(fullPath, content, 'utf-8')

    res.json({ success: true })
  } catch (error) {
    console.error('写入文件错误:', error)
    res.status(500).json({ error: '写入文件失败' })
  }
})

// 列出目录
router.get('/list/:dir(*)', async (req, res) => {
  try {
    const dirPath = req.params.dir
    if (!validatePath(dirPath)) {
      return res.status(400).json({ error: '无效的目录路径' })
    }

    const fullPath = join(PROJECT_ROOT, dirPath)
    if (!existsSync(fullPath)) {
      return res.status(404).json({ error: '目录不存在' })
    }

    const files = await readdir(fullPath)
    res.json(files)
  } catch (error) {
    console.error('列出文件错误:', error)
    res.status(500).json({ error: '列出文件失败' })
  }
})

export default router

