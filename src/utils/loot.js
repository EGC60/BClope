import { SLOTS, ITEM_POOL, STATS, RARITY_COLORS } from '../data/items.js'

const RARITY_RATES = [
  { rarity: 'commun', weight: 60 },
  { rarity: 'rare', weight: 25 },
  { rarity: 'épique', weight: 10 },
  { rarity: 'unique', weight: 4 },
  { rarity: 'mythique', weight: 1 },
]

const STAT_RANGES = {
  commun: [5, 10],
  rare: [11, 20],
  épique: [21, 35],
  unique: [36, 50],
  mythique: [51, 75],
}

function randomRarity() {
  const total = RARITY_RATES.reduce((s, r) => s + r.weight, 0)
  let roll = Math.random() * total
  for (const r of RARITY_RATES) {
    roll -= r.weight
    if (roll <= 0) return r.rarity
  }
  return 'commun'
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateLoot() {
  const rarity = randomRarity()
  const slot = SLOTS[Math.floor(Math.random() * SLOTS.length)]
  const pool = ITEM_POOL[slot].filter(i => i.rarity === rarity)
  const item = pool.length > 0 ? pool[0] : ITEM_POOL[slot][0]
  const stat = STATS[Math.floor(Math.random() * STATS.length)]
  const [min, max] = STAT_RANGES[rarity]
  const statValue = randInt(min, max)
  const id = `${slot}_${rarity}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

  return {
    id,
    slot,
    rarity,
    name: item.name,
    stat,
    statValue,
    color: RARITY_COLORS[rarity],
  }
}
