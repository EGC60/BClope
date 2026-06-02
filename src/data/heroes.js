export const RARITY_COLORS = {
  commun: '#9ca3af', rare: '#3b82f6', épique: '#a855f7', unique: '#f97316', mythique: '#eab308',
}
export const RARITY_LABELS = {
  commun: 'COMMUN', rare: 'RARE', épique: 'ÉPIQUE', unique: 'UNIQUE', mythique: 'MYTHIQUE',
}
export const RARITY_ORDER = ['commun', 'rare', 'épique', 'unique', 'mythique']

// Image files live in public/heroes/. image:null means no art yet -> placeholder silhouette is shown.
export const HEROES = [
  { id: 'vagabond',     name: 'Le Vagabond',          rarity: 'commun',   image: null },
  { id: 'novice_ombre', name: "L'Apprenti des Ombres", rarity: 'commun',   image: null },
  { id: 'encapuchonne', name: 'Le Novice Encapuchonné',rarity: 'commun',   image: null },
  { id: 'rodeur_azur',  name: "L'Assassin Azur",       rarity: 'rare',     image: null },
  { id: 'lame_argent',  name: 'La Lame Argentée',      rarity: 'rare',     image: null },
  { id: 'spectre',      name: 'Le Spectre Errant',     rarity: 'rare',     image: null },
  { id: 'mage_runes',   name: 'Le Mage des Runes',     rarity: 'épique',   image: null },
  { id: 'ombre_pourpre',name: "L'Ombre Pourpre",       rarity: 'épique',   image: null },
  { id: 'damne_ardent', name: 'Le Damné Ardent',       rarity: 'unique',   image: null },
  { id: 'seigneur_braises', name: 'Le Seigneur des Braises', rarity: 'unique', image: null },
  { id: 'immortel_dore', name: "L'Immortel Doré",      rarity: 'mythique', image: null },
]

export const STARTER_HERO_ID = 'vagabond'

export const DUPLICATE_XP = { commun: 25, rare: 60, épique: 120, unique: 250, mythique: 500 }

export function getHero(id) { return HEROES.find(h => h.id === id) || null }
export function heroesByRarity(rarity) { return HEROES.filter(h => h.rarity === rarity) }
