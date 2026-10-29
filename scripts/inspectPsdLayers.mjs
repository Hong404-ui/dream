import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readPsd } from 'ag-psd'

const [inputPath, outputPath] = process.argv.slice(2)

if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/inspectPsdLayers.mjs <input.psd> <output.json>')
}

const document = readPsd(await readFile(resolve(inputPath)), {
  skipCompositeImageData: true,
  skipLayerImageData: true,
})

function mapLayer(layer) {
  return {
    name: layer.name ?? 'unnamed-layer',
    hidden: Boolean(layer.hidden),
    bounds: [layer.left ?? 0, layer.top ?? 0, layer.right ?? 0, layer.bottom ?? 0],
    opacity: layer.opacity ?? 1,
    blendMode: layer.blendMode ?? 'normal',
    children: layer.children?.map(mapLayer) ?? [],
  }
}

const manifest = {
  width: document.width,
  height: document.height,
  layers: document.children?.map(mapLayer) ?? [],
}

await writeFile(resolve(outputPath), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
console.log(`Wrote ${outputPath}`)
