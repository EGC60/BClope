import { HEROES, RARITY_COLORS, RARITY_ORDER, heroesByRarity } from '../data/heroes.js'

const RARITY_RATES = [
  { rarity: 'commun', weight: 60 },
  { rarity: 'rare', weight: 25 },
  { rarity: 'épique', weight: 10 },
  { rarity: 'unique', weight: 4 },
  { rarity: 'mythique', weight: 1 },
]

function randomRarity() {
  const total = RARITY_RATES.reduce((s, r) => s + r.weight, 0)
  let roll = Math.random() * total
  for (const r of RARITY_RATES) {
    roll -= r.weight
    if (roll <= 0) return r.rarity
  }
  return 'commun'
}

// Pick a hero of the given rarity. If none exist for that rarity,
// fall back to the next lower rarity that has heroes defined.
function pickHeroForRarity(rarity) {
  let idx = RARITY_ORDER.indexOf(rarity)
  if (idx < 0) idx = 0
  for (let i = idx; i >= 0; i--) {
    const pool = heroesByRarity(RARITY_ORDER[i])
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)]
    }
  }
  // Last resort: any hero at all.
  return HEROES[Math.floor(Math.random() * HEROES.length)]
}

export function rollHero() {
  const rarity = randomRarity()
  const hero = pickHeroForRarity(rarity)
  return {
    id: hero.id,
    name: hero.name,
    rarity: hero.rarity,
    image: hero.image,
    color: RARITY_COLORS[hero.rarity],
  }
}
