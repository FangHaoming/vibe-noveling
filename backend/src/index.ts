import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fileRoutes from './routes/files.js'
import aiRoutes from './routes/ai.js'

// 获取当前文件的目录，确保从 backend 目录加载 .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const envPath = join(__dirname, '../..', '.env')
dotenv.config({ path: envPath })

const app = express()
const PORT = process.env.PORT || 3001

// app.use(cors())
app.use(express.json())

// 路由
app.use('/api/files', fileRoutes)
app.use('/api/ai', aiRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})

