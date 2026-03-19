import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { resolve } from 'node:path'

type PieceRecord = Record<string, string | number | undefined>

function parsePieces(content: string): PieceRecord[] {
  const pieces: PieceRecord[] = []
  const objPattern = /\{([^{}]+)\}/g
  let m
  while ((m = objPattern.exec(content)) !== null) {
    const obj: PieceRecord = {}
    const body = m[1]
    // string fields
    const strPattern = /(\w+):\s*'([^']*)'/g
    let f
    while ((f = strPattern.exec(body)) !== null) {
      obj[f[1]] = f[2]
    }
    // number fields (not inside quotes)
    const numPattern = /(\w+):\s*(\d+(?:\.\d+)?)\s*,/g
    while ((f = numPattern.exec(body)) !== null) {
      obj[f[1]] = Number(f[2])
    }
    if (obj.id) pieces.push(obj)
  }
  return pieces
}

function generatePiecesTs(pieces: PieceRecord[]): string {
  const esc = (s: unknown) => String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const body = pieces
    .map(p => {
      const lines = [
        `    id: '${esc(p.id)}',`,
        `    title: '${esc(p.title)}',`,
        `    description: '${esc(p.description)}',`,
        `    image_url: '${esc(p.image_url)}',`,
        `    category: '${esc(p.category)}',`,
      ]
      if (p.price !== undefined && p.price !== '') lines.push(`    price: ${Number(p.price)},`)
      if (p.stock !== undefined && p.stock !== '') lines.push(`    stock: ${Number(p.stock)},`)
      return `  {\n${lines.join('\n')}\n  }`
    })
    .join(',\n')

  return `export type Piece = {
  id: string
  title: string
  description: string
  image_url: string
  category: 'art' | 'bowl' | 'cup' | 'set' | 'process'
  price?: number
  stock?: number
}

const pieces: Piece[] = [
${body},
]

export default pieces
`
}

export default defineConfig({
  base: '/pottery-site-2/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    {
      name: 'admin-api',
      configureServer(server) {
        const piecesPath = path.resolve('src/data/pieces.ts')

        server.middlewares.use('/api/pieces', (req, res) => {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')

          if (req.method === 'GET') {
            try {
              const content = fs.readFileSync(piecesPath, 'utf-8')
              res.end(JSON.stringify(parsePieces(content)))
            } catch (e) {
              res.statusCode = 500
              res.end(JSON.stringify({ error: String(e) }))
            }
          } else if (req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              try {
                const pieces = JSON.parse(body)
                fs.writeFileSync(piecesPath, generatePiecesTs(pieces), 'utf-8')
                res.end(JSON.stringify({ ok: true }))
              } catch (e) {
                res.statusCode = 400
                res.end(JSON.stringify({ error: String(e) }))
              }
            })
          } else {
            res.statusCode = 405
            res.end('{}')
          }
        })
      },
    },
  ],
})
