import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { initializeCanvas, readPsd } from 'ag-psd'
import { createCanvas, createImageData } from '@napi-rs/canvas/node-canvas.js'
import { PNG } from 'pngjs'

const [inputPath, outputPath] = process.argv.slice(2)

if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/exportPsdComposite.mjs <input.psd> <output.png>')
}

const input = resolve(inputPath)
const output = resolve(outputPath)
const psdBuffer = await readFile(input)

initializeCanvas(createCanvas, createImageData)

const document = readPsd(psdBuffer, { useImageData: true, skipLayerImageData: true })

if (!document.imageData) {
  throw new Error('The PSD does not contain a composite image.')
}

const image = new PNG({
  width: document.width,
  height: document.height,
})

image.data = Buffer.from(document.imageData.data)

await mkdir(dirname(output), { recursive: true })
await writeFile(output, PNG.sync.write(image, { colorType: 6 }))

console.log(`Exported ${document.width}x${document.height} composite to ${output}`)
