export const RARITY_COLORS = {
  commun: '#9ca3af', rare: '#3b82f6', épique: '#a855f7', unique: '#f97316', mythique: '#eab308',
}
export const RARITY_LABELS = {
  commun: 'COMMUN', rare: 'RARE', épique: 'ÉPIQUE', unique: 'UNIQUE', mythique: 'MYTHIQUE',
}
export const RARITY_ORDER = ['commun', 'rare', 'épique', 'unique', 'mythique']

// Image files live in public/heroes/. image:null means no art yet -> placeholder silhouette is shown.
export const HEROES = [
  // ── COMMUN ──────────────────────────────────────────────────────────────
  { id: 'naruto_genin',   name: 'Naruto Genin',         rarity: 'commun',   image: 'naruto_genin.png' },
  { id: 'sakura',         name: 'Sakura Haruno',         rarity: 'commun',   image: 'sakura.png' },
  { id: 'shikamaru',      name: 'Shikamaru Nara',        rarity: 'commun',   image: null },
  { id: 'orihime',        name: 'Orihime Inoue',         rarity: 'commun',   image: null },
  { id: 'kite',           name: 'Kite',                  rarity: 'commun',   image: null },
  { id: 'palm',           name: 'Palm Siberia',          rarity: 'commun',   image: null },

  // ── RARE ────────────────────────────────────────────────────────────────
  { id: 'kakashi',        name: 'Kakashi Hatake',        rarity: 'rare',     image: null },
  { id: 'rock_lee',       name: 'Rock Lee',              rarity: 'rare',     image: null },
  { id: 'hitsugaya',      name: 'Tōshirō Hitsugaya',    rarity: 'rare',     image: null },
  { id: 'renji',          name: 'Renji Abarai',          rarity: 'rare',     image: null },
  { id: 'kurapika',       name: 'Kurapika',              rarity: 'rare',     image: null },
  { id: 'leorio',         name: 'Leorio',                rarity: 'rare',     image: null },
  { id: 'ging',           name: 'Ging Freecss',          rarity: 'rare',     image: null },

  // ── ÉPIQUE ──────────────────────────────────────────────────────────────
  { id: 'itachi',         name: 'Itachi Uchiha',         rarity: 'épique',   image: null },
  { id: 'jiraiya',        name: 'Jiraiya',               rarity: 'épique',   image: null },
  { id: 'pain',           name: 'Pain / Nagato',         rarity: 'épique',   image: null },
  { id: 'byakuya',        name: 'Byakuya Kuchiki',       rarity: 'épique',   image: null },
  { id: 'ulquiorra',      name: 'Ulquiorra Cifer',       rarity: 'épique',   image: null },
  { id: 'grimmjow',       name: 'Grimmjow',              rarity: 'épique',   image: null },
  { id: 'hisoka',         name: 'Hisoka',                rarity: 'épique',   image: null },
  { id: 'chrollo',        name: 'Chrollo Lucilfer',      rarity: 'épique',   image: null },

  // ── UNIQUE ──────────────────────────────────────────────────────────────
  { id: 'madara',         name: 'Madara Uchiha',         rarity: 'unique',   image: null },
  { id: 'minato',         name: 'Minato Namikaze',       rarity: 'unique',   image: null },
  { id: 'aizen',          name: 'Aizen Sōsuke',         rarity: 'unique',   image: null },
  { id: 'kenpachi',       name: 'Kenpachi Zaraki',       rarity: 'unique',   image: null },
  { id: 'yamamoto',       name: 'Yamamoto Genryūsai',   rarity: 'unique',   image: null },
  { id: 'meruem',         name: 'Meruem',                rarity: 'unique',   image: null },
  { id: 'netero',         name: 'Isaac Netero',          rarity: 'unique',   image: null },

  // ── MYTHIQUE ────────────────────────────────────────────────────────────
  { id: 'naruto_kyubi',   name: 'Naruto — Mode Kyūbi',  rarity: 'mythique', image: null },
  { id: 'sasuke',         name: 'Sasuke Uchiha',         rarity: 'mythique', image: null },
  { id: 'ichigo_final',   name: 'Ichigo — Forme Finale', rarity: 'mythique', image: null },
  { id: 'gon_adult',      name: 'Gon — Transformation', rarity: 'mythique', image: null },
  { id: 'killua_godspeed',name: 'Killua — Godspeed',    rarity: 'mythique', image: null },
]

export const STARTER_HERO_ID = 'naruto_genin'

export const DUPLICATE_XP = { commun: 25, rare: 60, épique: 120, unique: 250, mythique: 500 }

export function getHero(id) { return HEROES.find(h => h.id === id) || null }
export function heroesByRarity(rarity) { return HEROES.filter(h => h.rarity === rarity) }
