import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, normalize, resolve, sep } from 'node:path'

const workspace = resolve('.')
const port = Number(process.env.PORT || 5176)
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp',
}

const server = createServer(async (request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname)
  const localPath = normalize(requestPath === '/' ? 'index.html' : requestPath).replace(/^[/\\]+/, '')
  const filePath = resolve(workspace, localPath)

  if (!filePath.startsWith(`${workspace}${sep}`) && filePath !== workspace) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  try {
    const file = await stat(filePath)
    if (!file.isFile()) throw new Error('Not a file')
    response.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream' })
    createReadStream(filePath).pipe(response)
  } catch {
    response.writeHead(404)
    response.end('Not found')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Static H5 server running at http://127.0.0.1:${port}/`)
})
