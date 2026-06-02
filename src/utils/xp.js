export const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000]
export const LEVEL_NAMES = ['Novice', 'Apprenti', 'Guerrier', 'Champion', 'Vétéran', 'Maître', 'Élite', 'Légende', 'Mythique', 'Immortel']

export function getLevel(xp) {
  let level = 0
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i
      break
    }
  }
  return level
}

export function getLevelName(level) {
  return LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length - 1)]
}

export function getXpForNextLevel(level) {
  if (level >= LEVEL_THRESHOLDS.length - 1) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  return LEVEL_THRESHOLDS[level + 1]
}

export function getXpProgress(xp, level) {
  const current = LEVEL_THRESHOLDS[level] || 0
  const next = getXpForNextLevel(level)
  if (next === current) return 1
  return Math.min(1, (xp - current) / (next - current))
}
