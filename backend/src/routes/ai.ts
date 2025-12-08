import express from 'express'
import { readFile } from 'fs/promises'
import { join, resolve } from 'path'
import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { fetch, ProxyAgent } from 'undici'

const router = express.Router()

// 代理配置
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy

// 创建自定义 fetch（支持代理）
let customFetch: typeof fetch = fetch

if (proxyUrl) {
  const proxyAgent = new ProxyAgent(proxyUrl)
  console.log(`🌐 AI 路由使用代理: ${proxyUrl}`)
  
  // 包装 fetch 以使用代理
  customFetch = ((url: any, options: any = {}) => {
    return fetch(url, { ...options, dispatcher: proxyAgent })
  }) as typeof fetch
}

// 在 Docker 环境中，工作目录是 /app/backend，项目根目录是 /app
// 在本地开发环境中，工作目录是 backend，项目根目录是 backend 的上一级
const PROJECT_ROOT = process.env.PROJECT_ROOT 
  ? resolve(process.env.PROJECT_ROOT)
  : resolve(process.cwd(), '..')

// AI 提供商类型
type AIProvider = 'openai' | 'anthropic' | 'deepseek'

// 延迟初始化客户端
let openaiClient: OpenAI | null = null
let anthropicClient: Anthropic | null = null
let deepseekClient: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    console.log('初始化 OpenAI 客户端...')
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? `已设置 (${process.env.OPENAI_API_KEY.substring(0, 10)}...)` : '未设置')
    console.log('OPENAI_BASE_URL:', process.env.OPENAI_BASE_URL || '默认官方')
    console.log('代理:', proxyUrl || '未设置')
    
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
      baseURL: process.env.OPENAI_BASE_URL || undefined,
      fetch: customFetch as any,
    })
  }
  return openaiClient
}

function getAnthropic(): Anthropic {
  if (!anthropicClient) {
    console.log('初始化 Anthropic 客户端...')
    console.log('ANTHROPIC_API_KEY:', process.env.ANTHROPIC_API_KEY ? `已设置 (${process.env.ANTHROPIC_API_KEY.substring(0, 10)}...)` : '未设置')
    console.log('ANTHROPIC_BASE_URL:', process.env.ANTHROPIC_BASE_URL || '默认官方')
    console.log('代理:', proxyUrl || '未设置')
    
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      baseURL: process.env.ANTHROPIC_BASE_URL || undefined,
      fetch: customFetch as any,
    })
  }
  return anthropicClient
}

function getDeepSeek(): OpenAI {
  if (!deepseekClient) {
    console.log('初始化 DeepSeek 客户端...')
    console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY ? `已设置 (${process.env.DEEPSEEK_API_KEY.substring(0, 10)}...)` : '未设置')
    console.log('代理:', proxyUrl || '未设置')
    
    deepseekClient = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY || '',
      baseURL: 'https://api.deepseek.com',
      fetch: customFetch as any,
    })
  }
  return deepseekClient
}

// 获取当前 AI 提供商
function getAIProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'deepseek').toLowerCase() as AIProvider
  return provider
}


// 统一的聊天接口
async function chat(systemPrompt: string, userMessage: string): Promise<string> {
  const provider = getAIProvider()
  
  console.log(`使用 AI 提供商: ${provider}`)
  
  if (provider === 'anthropic') {
    const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514'
    console.log(`Anthropic 模型: ${model}`)
    
    const response = await getAnthropic().messages.create({
      model,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userMessage },
      ],
    })
    
    const content = response.content[0]
    if (content.type === 'text') {
      return content.text
    }
    return '抱歉，无法生成响应。'
  } else if (provider === 'deepseek') {
    // DeepSeek（使用 OpenAI 兼容接口）
    const model = process.env.DEEPSEEK_MODEL || 'deepseek-chat'
    console.log(`DeepSeek 模型: ${model}`)
    
    const completion = await getDeepSeek().chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
    })
    
    return completion.choices[0]?.message?.content || '抱歉，无法生成响应。'
  } else {
    // OpenAI
    const model = process.env.OPENAI_MODEL || 'gpt-4'
    console.log(`OpenAI 模型: ${model}`)
    
    const completion = await getOpenAI().responses.create({
      model,
      input: [
        { role: 'developer', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    })
    
    return completion.output_text || '抱歉，无法生成响应。'
  }
}

// 读取项目文件作为上下文
async function loadContext(): Promise<string> {
  const files = [
    'prompts/rules.md',
    'prompts/outline.md',
    'prompts/setting.md',
    'prompts/characters.md',
    'prompts/style_guide.md',
  ]

  const contexts: string[] = []

  for (const file of files) {
    try {
      const content = await readFile(join(PROJECT_ROOT, file), 'utf-8')
      contexts.push(`## ${file}\n${content}`)
    } catch (error) {
      console.warn(`无法读取 ${file}:`, error)
    }
  }

  return contexts.join('\n\n---\n\n')
}

// 聊天接口
router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body

    if (!message) {
      return res.status(400).json({ error: '消息内容不能为空' })
    }

    // 加载项目上下文
    const projectContext = await loadContext()

    const systemPrompt = `你是一个专业的小说创作助手。你的任务是帮助用户创作小说。

项目规则和设定：
${projectContext}

请严格遵循项目的规则和设定，保持角色性格一致性，遵循世界观设定。`

    const response = await chat(systemPrompt, message)

    res.json({
      content: response,
      updates: {
        files: [],
        actions: [],
      },
    })
  } catch (error) {
    console.error('AI 聊天错误:', error)
    res.status(500).json({ error: 'AI 响应失败' })
  }
})

// 生成章节
router.post('/generate-chapter', async (req, res) => {
  try {
    const { chapterNumber, context } = req.body

    if (!chapterNumber) {
      return res.status(400).json({ error: '章节编号不能为空' })
    }

    const projectContext = await loadContext()
    const fullContext = context ? `${projectContext}\n\n${context}` : projectContext

    const systemPrompt = `你是一个专业的小说创作助手。请生成第 ${chapterNumber} 章的内容。

项目规则和设定：
${fullContext}

请：
1. 严格遵循项目的规则和设定
2. 保持角色性格一致性
3. 遵循世界观设定
4. 生成完整的章节内容
5. 在回复中说明需要更新哪些文件（database、列表文件等）`

    const response = await chat(systemPrompt, `请生成第 ${chapterNumber} 章的完整内容。`)

    res.json({
      content: response,
      updates: {
        files: [`prompts/chapters/${String(chapterNumber).padStart(3, '0')}_章节名.md`],
        actions: ['创建章节文件', '更新 database', '更新列表文件'],
      },
    })
  } catch (error) {
    console.error('生成章节错误:', error)
    res.status(500).json({ error: '生成章节失败' })
  }
})

// 修改章节
router.post('/modify-chapter', async (req, res) => {
  try {
    const { chapterNumber, modifications, context } = req.body

    if (!chapterNumber || !modifications) {
      return res.status(400).json({ error: '章节编号和修改内容不能为空' })
    }

    const projectContext = await loadContext()

    const systemPrompt = `你是一个专业的小说创作助手。请根据要求修改第 ${chapterNumber} 章。

项目规则和设定：
${projectContext}

修改要求：
${modifications}

请：
1. 保持与原有内容的一致性
2. 遵循项目的规则和设定
3. 在回复中说明需要更新哪些文件`

    const response = await chat(systemPrompt, `请修改第 ${chapterNumber} 章：${modifications}`)

    res.json({
      content: response,
      updates: {
        files: [`prompts/chapters/${String(chapterNumber).padStart(3, '0')}_章节名.md`],
        actions: ['更新章节文件', '更新 database', '更新列表文件'],
      },
    })
  } catch (error) {
    console.error('修改章节错误:', error)
    res.status(500).json({ error: '修改章节失败' })
  }
})

// 检查一致性
router.post('/check-consistency', async (req, res) => {
  try {
    // TODO: 实现一致性检查逻辑
    res.json({
      content: '一致性检查功能开发中...',
      updates: {
        files: [],
        actions: [],
      },
    })
  } catch (error) {
    console.error('检查一致性错误:', error)
    res.status(500).json({ error: '检查一致性失败' })
  }
})

// 获取 AI 配置（用于调试）
router.get('/config', (req, res) => {
  res.json({
    provider: process.env.AI_PROVIDER || 'deepseek (默认)',
    deepseek: {
      apiKey: process.env.DEEPSEEK_API_KEY ? '已设置' : '未设置',
      baseURL: 'https://api.deepseek.com',
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat (默认)',
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY ? '已设置' : '未设置',
      baseURL: process.env.OPENAI_BASE_URL || '默认官方',
      model: process.env.OPENAI_MODEL || 'gpt-4 (默认)',
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY ? '已设置' : '未设置',
      baseURL: process.env.ANTHROPIC_BASE_URL || '默认官方',
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514 (默认)',
    },
  })
})

export default router
