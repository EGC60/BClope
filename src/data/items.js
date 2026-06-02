export const SLOTS = ['helmet', 'armor', 'weapon', 'boots', 'gloves', 'ring', 'amulet', 'shield']

export const SLOT_LABELS = {
  helmet: 'Casque',
  armor: 'Armure',
  weapon: 'Arme',
  boots: 'Bottes',
  gloves: 'Gantelets',
  ring: 'Anneau',
  amulet: 'Amulette',
  shield: 'Égide',
}

export const SLOT_ICONS = {
  helmet: '⛑',
  armor: '🥋',
  weapon: '⚔️',
  boots: '👢',
  gloves: '🧤',
  ring: '💍',
  amulet: '📿',
  shield: '🛡',
}

export const ITEM_POOL = {
  helmet: [
    { name: 'Heaume de Fer', rarity: 'commun' },
    { name: 'Capuche Spectrale', rarity: 'rare' },
    { name: 'Coiffe des Ombres', rarity: 'épique' },
    { name: 'Couronne Maudite', rarity: 'unique' },
    { name: 'Diadème Infernal', rarity: 'mythique' },
  ],
  armor: [
    { name: 'Tunique de Cuir', rarity: 'commun' },
    { name: 'Cape Azurée', rarity: 'rare' },
    { name: 'Robe des Ombres', rarity: 'épique' },
    { name: 'Manteau Cramoisi', rarity: 'unique' },
    { name: 'Armure Infernale', rarity: 'mythique' },
  ],
  weapon: [
    { name: 'Dague Rouillée', rarity: 'commun' },
    { name: 'Épée Argentée', rarity: 'rare' },
    { name: 'Bâton des Âmes', rarity: 'épique' },
    { name: 'Faux Maudite', rarity: 'unique' },
    { name: 'Lame Divine', rarity: 'mythique' },
  ],
  boots: [
    { name: 'Bottes de Bois', rarity: 'commun' },
    { name: 'Bottes de Cuir', rarity: 'rare' },
    { name: 'Bottes Spectrales', rarity: 'épique' },
    { name: "Bottes de l'Abîme", rarity: 'unique' },
    { name: 'Sandales Divines', rarity: 'mythique' },
  ],
  gloves: [
    { name: 'Gantelets de Fer Froid', rarity: 'commun' },
    { name: 'Gants Enchantés', rarity: 'rare' },
    { name: 'Griffes des Ombres', rarity: 'épique' },
    { name: 'Gants du Démon', rarity: 'unique' },
    { name: 'Gantelets Sacrés', rarity: 'mythique' },
  ],
  ring: [
    { name: 'Anneau Terne', rarity: 'commun' },
    { name: "Anneau d'Argent", rarity: 'rare' },
    { name: 'Bague Runique', rarity: 'épique' },
    { name: 'Sceau Maudit', rarity: 'unique' },
    { name: 'Anneau Divin', rarity: 'mythique' },
  ],
  amulet: [
    { name: 'Médaillon Brisé', rarity: 'commun' },
    { name: "Amulette d'Argent", rarity: 'rare' },
    { name: 'Pendentif Runique', rarity: 'épique' },
    { name: 'Talisman Maudit', rarity: 'unique' },
    { name: 'Relique Divine', rarity: 'mythique' },
  ],
  shield: [
    { name: 'Égide de Bois', rarity: 'commun' },
    { name: "Bouclier d'Acier", rarity: 'rare' },
    { name: 'Égide Spectrale', rarity: 'épique' },
    { name: 'Rempart du Démon', rarity: 'unique' },
    { name: 'Bouclier Sacré', rarity: 'mythique' },
  ],
}

export const STATS = ['Sang-froid', 'Volonté', 'Endurance', 'Résistance', 'Vitalité', 'Discipline', 'Courage', 'Patience']

export const RARITY_COLORS = {
  commun: '#9ca3af',
  rare: '#3b82f6',
  épique: '#a855f7',
  unique: '#f97316',
  mythique: '#eab308',
}

export const RARITY_LABELS = {
  commun: 'COMMUN',
  rare: 'RARE',
  épique: 'ÉPIQUE',
  unique: 'UNIQUE',
  mythique: 'MYTHIQUE',
}
