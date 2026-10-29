import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { initializeCanvas, readPsd } from 'ag-psd'
import { createCanvas, createImageData } from '@napi-rs/canvas/node-canvas.js'

const [inputPath, outputDirectory] = process.argv.slice(2)

if (!inputPath || !outputDirectory) {
  throw new Error('Usage: node scripts/exportPsdHeroLayers.mjs <input.psd> <output-directory>')
}

initializeCanvas(createCanvas, createImageData)

const ARTBOARD_WIDTH = 1920
const HERO_HEIGHT = 1230
const assetDefinitions = [
  { fileName: 'hero-background.png', layerName: '背景 拷贝' },
  { fileName: 'hero-characters.png', layerName: '组 1' },
  { fileName: 'hero-copy.png', layerName: '文案' },
  { fileName: 'hero-leaves.png', layerName: '枫叶' },
  { fileName: 'hero-entry-button.png', layerName: '按钮 拷贝 2' },
  { fileName: 'hero-logo.png', layerName: '梦幻logo7.7版' },
]

const document = readPsd(await readFile(resolve(inputPath)), {
  skipCompositeImageData: true,
  useImageData: true,
})

function drawLayer(context, layer) {
  if (layer.hidden) return

  if (layer.children?.length) {
    for (const child of layer.children) {
      drawLayer(context, child)
    }
    return
  }

  if (!layer.imageData || layer.right <= 0 || layer.bottom <= 0) return

  const layerCanvas = createCanvas(layer.imageData.width, layer.imageData.height)
  layerCanvas.getContext('2d').putImageData(layer.imageData, 0, 0)
  context.save()
  context.globalAlpha = layer.opacity ?? 1
  context.drawImage(layerCanvas, layer.left, layer.top)
  context.restore()
}

const output = resolve(outputDirectory)
await mkdir(output, { recursive: true })

for (const definition of assetDefinitions) {
  const layer = document.children?.find((item) => item.name === definition.layerName)

  if (!layer) {
    throw new Error(`Cannot find layer: ${definition.layerName}`)
  }

  const canvas = createCanvas(ARTBOARD_WIDTH, HERO_HEIGHT)
  drawLayer(canvas.getContext('2d'), layer)
  await writeFile(resolve(output, definition.fileName), await canvas.encode('png'))
}

console.log(`Exported ${assetDefinitions.length} hero assets to ${output}`)
