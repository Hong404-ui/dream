import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createCanvas, loadImage } from '@napi-rs/canvas'

const inputPath = resolve('src/assets/images/anniversary-page.png')
const outputDirectory = resolve('ossweb-img/mobile')

const crops = [
  { fileName: 'hero.webp', left: 0, top: 0, width: 1920, height: 1230 },
  { fileName: 'server.webp', left: 0, top: 3750, width: 1920, height: 460 },
  { fileName: 'benefits.webp', left: 0, top: 4210, width: 1920, height: 990 },
]

const activityCardSlots = [
  { left: 375, top: 245, width: 290, height: 325 },
  { left: 665, top: 245, width: 290, height: 325 },
  { left: 955, top: 245, width: 290, height: 325 },
  { left: 1245, top: 245, width: 290, height: 325 },
  { left: 375, top: 580, width: 290, height: 325 },
  { left: 665, top: 580, width: 290, height: 325 },
  { left: 955, top: 580, width: 290, height: 325 },
  { left: 1245, top: 580, width: 290, height: 325 },
  { left: 645, top: 910, width: 310, height: 330 },
  { left: 965, top: 910, width: 310, height: 330 },
]

const rewardCards = [
  { fileName: 'reward-card-01.webp', left: 370, top: 390, width: 290, height: 290 },
  { fileName: 'reward-card-02.webp', left: 670, top: 390, width: 290, height: 290 },
  { fileName: 'reward-card-03.webp', left: 970, top: 390, width: 290, height: 290 },
  { fileName: 'reward-card-04.webp', left: 1270, top: 390, width: 290, height: 290 },
  { fileName: 'reward-card-05.webp', left: 370, top: 700, width: 590, height: 320 },
  { fileName: 'reward-card-06.webp', left: 960, top: 700, width: 590, height: 320 },
]

const source = await loadImage(await readFile(inputPath))
await mkdir(outputDirectory, { recursive: true })

for (const crop of crops) {
  const canvas = createCanvas(crop.width, crop.height)
  canvas
    .getContext('2d')
    .drawImage(source, crop.left, crop.top, crop.width, crop.height, 0, 0, crop.width, crop.height)

  await writeFile(resolve(outputDirectory, crop.fileName), await canvas.encode('webp', 82))
}

const activitiesCanvas = createCanvas(1920, 1420)
const activitiesContext = activitiesCanvas.getContext('2d')
activitiesContext.drawImage(source, 0, 1190, 1920, 1420, 0, 0, 1920, 1420)

for (const card of activityCardSlots) {
  activitiesContext.fillStyle = '#f7e3b8'
  activitiesContext.fillRect(card.left, card.top, card.width, card.height)
}

await writeFile(resolve(outputDirectory, 'activities-base.webp'), await activitiesCanvas.encode('webp', 82))

const rewardsCanvas = createCanvas(1920, 1170)
const rewardsContext = rewardsCanvas.getContext('2d')
rewardsContext.drawImage(source, 0, 2590, 1920, 1170, 0, 0, 1920, 1170)

for (const card of rewardCards) {
  const cardCanvas = createCanvas(card.width, card.height)
  cardCanvas.getContext('2d').drawImage(rewardsCanvas, card.left, card.top, card.width, card.height, 0, 0, card.width, card.height)
  await writeFile(resolve(outputDirectory, card.fileName), await cardCanvas.encode('webp', 82))

  rewardsContext.fillStyle = '#f7e3b8'
  rewardsContext.fillRect(card.left - 4, card.top - 4, card.width + 8, card.height + 8)
}

await writeFile(resolve(outputDirectory, 'rewards-base.webp'), await rewardsCanvas.encode('webp', 82))

console.log(`Exported ${crops.length + rewardCards.length + 2} mobile artwork assets.`)
