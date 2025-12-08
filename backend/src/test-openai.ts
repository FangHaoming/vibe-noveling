/**
 * OpenAI API 测试脚本
 * 
 * 使用方法:
 *   cd backend
 *   npx tsx src/test-openai.ts
 * 
 * 确保已设置环境变量:
 *   - OPENAI_API_KEY: 你的 OpenAI API 密钥
 *   - OPENAI_MODEL: 模型名称（可选，默认 gpt-4）
 *   - OPENAI_BASE_URL: 自定义 API 地址（可选）
 *   - HTTPS_PROXY: 代理地址（可选，如 http://127.0.0.1:7890）
 */

import OpenAI from 'openai'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { fetch, Agent, ProxyAgent } from 'undici'

// Polyfill globalThis.fetch for OpenAI SDK
;(globalThis as any).fetch = fetch

// 获取当前文件的目录，确保从 backend 目录加载 .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '../..', '.env')
dotenv.config({ path: envPath })

// 代理配置
const proxyUrl = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy

// 配置信息
const config = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_BASE_URL || undefined,
  model: process.env.OPENAI_MODEL || 'gpt-4',
  proxy: proxyUrl,
}

// 打印配置状态
console.log('='.repeat(50))
console.log('OpenAI 测试脚本')
console.log('='.repeat(50))
console.log(`API Key: ${config.apiKey ? `已设置 (${config.apiKey.substring(0, 10)}...)` : '❌ 未设置'}`)
console.log(`Base URL: ${config.baseURL || '默认官方 API'}`)
console.log(`Model: ${config.model}`)
console.log(`Proxy: ${config.proxy || '❌ 未设置（可能导致地区限制错误）'}`)
console.log('='.repeat(50))

if (!config.apiKey) {
  console.error('\n❌ 错误: 请设置 OPENAI_API_KEY 环境变量')
  console.log('\n设置方法:')
  console.log('  1. 在项目根目录创建 .env 文件')
  console.log('  2. 添加: OPENAI_API_KEY=sk-your-api-key')
  process.exit(1)
}

// 创建自定义 fetch（支持代理）
let customFetch: typeof fetch = fetch

if (config.proxy) {
  const proxyAgent = new ProxyAgent(config.proxy)
  console.log(`\n🌐 使用代理: ${config.proxy}`)
  
  // 包装 fetch 以使用代理
  customFetch = ((url: any, options: any = {}) => {
    return fetch(url, { ...options, dispatcher: proxyAgent })
  }) as typeof fetch
}

// 创建客户端
const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.baseURL,
  fetch: customFetch as any,
})

// 测试函数：使用 Chat Completions API
async function testChatCompletions() {
  console.log('\n📝 测试 Chat Completions API...')
  
  try {
    const completion = await openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: 'system', content: '你是一个友好的助手。' },
        { role: 'user', content: '你好！请用一句话介绍一下自己。' },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    console.log('\n✅ Chat Completions 测试成功!')
    console.log(`回复: ${completion.choices[0]?.message?.content}`)
    console.log(`Token 使用: ${completion.usage?.total_tokens} (prompt: ${completion.usage?.prompt_tokens}, completion: ${completion.usage?.completion_tokens})`)
    return true
  } catch (error: any) {
    console.error('\n❌ Chat Completions 测试失败:')
    if (error.code === 'unsupported_country_region_territory') {
      console.error('   地区限制错误！请设置代理:')
      console.error('   在 .env 文件中添加: HTTPS_PROXY=http://127.0.0.1:7890')
    } else {
      console.error('  ', error.message || error)
    }
    return false
  }
}

// 测试函数：使用 Responses API（新版本 API）
async function testResponsesAPI() {
  console.log('\n📝 测试 Responses API（新版 OpenAI API）...')
  
  try {
    const response = await openai.responses.create({
      model: config.model,
      input: [
        { role: 'developer', content: '你是一个友好的助手。' },
        { role: 'user', content: '你好！请用一句话介绍一下自己。' },
      ],
    })

    console.log('\n✅ Responses API 测试成功!')
    console.log(`回复: ${response.output_text}`)
    return true
  } catch (error: any) {
    if (error.code === 'method_not_found' || error.status === 404) {
      console.log('\n⚠️ Responses API 不可用（可能使用的是旧版 API 或自定义端点）')
    } else if (error.code === 'unsupported_country_region_territory') {
      console.error('\n❌ Responses API 测试失败: 地区限制')
    } else {
      console.error('\n❌ Responses API 测试失败:', error.message || error)
    }
    return false
  }
}

// 测试函数：列出可用模型
async function listModels() {
  console.log('\n📝 获取可用模型列表...')
  
  try {
    const models = await openai.models.list()
    const gptModels = models.data
      .filter(m => m.id.includes('gpt'))
      .map(m => m.id)
      .sort()
    
    console.log('\n✅ 可用的 GPT 模型:')
    gptModels.slice(0, 10).forEach(m => console.log(`  - ${m}`))
    if (gptModels.length > 10) {
      console.log(`  ... 还有 ${gptModels.length - 10} 个模型`)
    }
    return true
  } catch (error: any) {
    console.error('\n❌ 获取模型列表失败:', error.message || error)
    return false
  }
}

// 测试流式输出
async function testStreaming() {
  console.log('\n📝 测试流式输出...')
  
  try {
    const stream = await openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: 'user', content: '用三句话描述今天的天气可能是什么样的。' },
      ],
      stream: true,
      max_tokens: 150,
    })

    console.log('\n✅ 流式输出测试:')
    process.stdout.write('回复: ')
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      process.stdout.write(content)
    }
    
    console.log('\n')
    return true
  } catch (error: any) {
    console.error('\n❌ 流式输出测试失败:', error.message || error)
    return false
  }
}

// 主函数
async function main() {
  console.log('\n开始测试...\n')
  
  const results: { name: string; success: boolean }[] = []
  
  // 测试 Chat Completions（最常用）
  results.push({ name: 'Chat Completions', success: await testChatCompletions() })
  
  // 测试 Responses API（新版）
  results.push({ name: 'Responses API', success: await testResponsesAPI() })
  
  // 测试流式输出
  results.push({ name: '流式输出', success: await testStreaming() })
  
  // 列出模型（可选）
  results.push({ name: '模型列表', success: await listModels() })
  
  // 打印结果汇总
  console.log('\n' + '='.repeat(50))
  console.log('测试结果汇总')
  console.log('='.repeat(50))
  results.forEach(r => {
    console.log(`${r.success ? '✅' : '❌'} ${r.name}`)
  })
  
  const passed = results.filter(r => r.success).length
  console.log(`\n总计: ${passed}/${results.length} 项测试通过`)
  
  if (passed < results.length && !config.proxy) {
    console.log('\n💡 提示: 如果遇到地区限制，请在 .env 中添加:')
    console.log('   HTTPS_PROXY=http://127.0.0.1:7890')
  }
}

main().catch(console.error)
