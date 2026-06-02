import React from 'react'

// Chibi dark fantasy character SVG that changes based on equipped items
export default function Character({ equipped = {} }) {
  const helmet = equipped.helmet?.rarity || null
  const armor = equipped.armor?.rarity || null
  const weapon = equipped.weapon?.rarity || null
  const shield = equipped.shield?.rarity || null
  const boots = equipped.boots?.rarity || null
  const gloves = equipped.gloves?.rarity || null
  const ring = equipped.ring?.rarity || null
  const amulet = equipped.amulet?.rarity || null

  // Colors by rarity
  const rarityColor = {
    commun: '#9ca3af',
    rare: '#3b82f6',
    épique: '#a855f7',
    unique: '#f97316',
    mythique: '#eab308',
  }

  // Armor body colors
  const armorBodyColor = {
    commun: '#92400e',
    rare: '#1d4ed8',
    épique: '#7e22ce',
    unique: '#c2410c',
    mythique: '#b45309',
  }
  const bodyColor = armor ? armorBodyColor[armor] : '#374151'

  // Boot colors
  const bootColor = boots ? rarityColor[boots] : '#1f2937'

  // Glove colors
  const gloveColor = gloves ? rarityColor[gloves] : '#374151'

  // Ring glow
  const ringGlow = ring ? rarityColor[ring] : null

  return (
    <svg
      viewBox="0 0 120 180"
      width="120"
      height="180"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(0,200,255,0.3))' }}
    >
      {/* Ring glow around character */}
      {ringGlow && (
        <ellipse cx="60" cy="155" rx="40" ry="8" fill="none" stroke={ringGlow} strokeWidth="2" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </ellipse>
      )}

      {/* BOOTS / LEGS */}
      {/* Left leg */}
      <rect x="42" y="130" width="14" height="28" rx="4" fill={bodyColor} />
      {/* Right leg */}
      <rect x="64" y="130" width="14" height="28" rx="4" fill={bodyColor} />
      {/* Left boot */}
      <rect x="38" y="148" width="18" height="14" rx="5" fill={bootColor} />
      {/* Right boot */}
      <rect x="64" y="148" width="18" height="14" rx="5" fill={bootColor} />
      {/* Boot details for rare+ */}
      {boots && boots !== 'commun' && (
        <>
          <rect x="38" y="148" width="18" height="3" rx="1" fill={rarityColor[boots]} opacity="0.7" />
          <rect x="64" y="148" width="18" height="3" rx="1" fill={rarityColor[boots]} opacity="0.7" />
        </>
      )}
      {/* Mythic boot glow */}
      {boots === 'mythique' && (
        <>
          <ellipse cx="47" cy="162" rx="9" ry="3" fill={rarityColor['mythique']} opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="73" cy="162" rx="9" ry="3" fill={rarityColor['mythique']} opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}

      {/* BODY / CLOAK */}
      {/* Main torso */}
      <rect x="35" y="88" width="50" height="50" rx="12" fill={bodyColor} />

      {/* Cloak/armor overlay for epic+ */}
      {armor === 'épique' && (
        <path d="M35 95 L25 140 L40 130 L35 138 L60 145 L85 138 L80 130 L95 140 L85 95 Z" fill="#581c87" opacity="0.8" />
      )}
      {armor === 'unique' && (
        <path d="M35 95 L22 145 L40 130 L35 140 L60 148 L85 140 L80 130 L98 145 L85 95 Z" fill="#7c2d12" opacity="0.85" />
      )}
      {armor === 'mythique' && (
        <path d="M35 95 L20 150 L40 132 L35 142 L60 150 L85 142 L80 132 L100 150 L85 95 Z" fill="#78350f" opacity="0.9" />
      )}
      {armor === 'rare' && (
        <path d="M35 95 L28 138 L38 128 L35 135 L60 142 L85 135 L82 128 L92 138 L85 95 Z" fill="#1e3a8a" opacity="0.75" />
      )}

      {/* Armor detail lines */}
      {armor && (
        <path d="M60 88 L60 138" stroke={rarityColor[armor]} strokeWidth="1.5" opacity="0.5" />
      )}
      {armor === 'mythique' && (
        <>
          <path d="M45 100 L75 100" stroke="#eab308" strokeWidth="1.5" opacity="0.7" />
          <path d="M42 112 L78 112" stroke="#eab308" strokeWidth="1" opacity="0.5" />
          <polygon points="60,90 65,100 60,95 55,100" fill="#eab308" opacity="0.8" />
        </>
      )}

      {/* Amulet on chest */}
      {amulet && (
        <g>
          <circle cx="60" cy="105" r="5" fill={rarityColor[amulet]} opacity="0.9" />
          <circle cx="60" cy="105" r="3" fill="#0a0a0a" opacity="0.6" />
          {amulet === 'mythique' && (
            <circle cx="60" cy="105" r="5" fill="none" stroke="#eab308" strokeWidth="1">
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      )}

      {/* SHIELD (left hand) */}
      {shield && (
        <g>
          {shield === 'commun' && (
            <ellipse cx="22" cy="115" rx="9" ry="11" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
          )}
          {shield === 'rare' && (
            <ellipse cx="20" cy="115" rx="10" ry="13" fill="#374151" stroke="#3b82f6" strokeWidth="2" />
          )}
          {shield === 'épique' && (
            <>
              <ellipse cx="19" cy="115" rx="11" ry="14" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" opacity="0.9" />
              <ellipse cx="19" cy="115" rx="6" ry="8" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.6" />
            </>
          )}
          {shield === 'unique' && (
            <>
              <path d="M8 105 L10 128 L19 133 L28 128 L30 105 L19 100 Z" fill="#7c2d12" stroke="#f97316" strokeWidth="2" />
              <path d="M19 102 L19 130" stroke="#f97316" strokeWidth="1" opacity="0.6" />
            </>
          )}
          {shield === 'mythique' && (
            <>
              <path d="M7 103 L9 128 L19 135 L29 128 L31 103 L19 97 Z" fill="#451a03" stroke="#eab308" strokeWidth="2" />
              <circle cx="19" cy="115" r="4" fill="#eab308" opacity="0.8">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </g>
      )}

      {/* WEAPON (right hand) */}
      {weapon && (
        <g>
          {weapon === 'commun' && (
            <>
              <rect x="95" y="108" width="4" height="18" rx="1" fill="#6b7280" />
              <polygon points="97,105 94,110 100,110" fill="#9ca3af" />
            </>
          )}
          {weapon === 'rare' && (
            <>
              <rect x="96" y="95" width="4" height="28" rx="1" fill="#c0c0c0" />
              <rect x="90" y="109" width="16" height="3" rx="1" fill="#9ca3af" />
              <polygon points="98,90 95,97 101,97" fill="#e2e8f0" />
            </>
          )}
          {weapon === 'épique' && (
            <>
              <rect x="97" y="88" width="4" height="38" rx="2" fill="#6d28d9" />
              <ellipse cx="99" cy="86" rx="5" ry="7" fill="#a855f7" opacity="0.9">
                <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="99" cy="86" rx="3" ry="5" fill="#c4b5fd" />
            </>
          )}
          {weapon === 'unique' && (
            <>
              <path d="M97 90 L101 90 L103 108 L99 128 L95 108 Z" fill="#7c2d12" stroke="#f97316" strokeWidth="1" />
              <path d="M92 88 L100 78 L108 88" fill="none" stroke="#f97316" strokeWidth="2" />
              <rect x="96" y="88" width="6" height="3" rx="1" fill="#f97316" opacity="0.8" />
            </>
          )}
          {weapon === 'mythique' && (
            <>
              <rect x="97" y="82" width="4" height="44" rx="2" fill="#92400e" />
              <path d="M94 82 L99 72 L104 82" fill="#eab308" />
              <ellipse cx="99" cy="78" rx="4" ry="5" fill="#fef08a" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
              </ellipse>
              <rect x="93" y="88" width="12" height="3" rx="1" fill="#eab308" opacity="0.9" />
            </>
          )}
        </g>
      )}

      {/* ARMS */}
      {/* Left arm */}
      <rect x="24" y="92" width="14" height="32" rx="6" fill={bodyColor} />
      {/* Right arm */}
      <rect x="82" y="92" width="14" height="32" rx="6" fill={bodyColor} />

      {/* Glove hands */}
      <ellipse cx="31" cy="126" rx="7" ry="6" fill={gloveColor} />
      <ellipse cx="89" cy="126" rx="7" ry="6" fill={gloveColor} />
      {gloves && gloves !== 'commun' && (
        <>
          <circle cx="31" cy="126" r="3" fill={rarityColor[gloves]} opacity="0.4" />
          <circle cx="89" cy="126" r="3" fill={rarityColor[gloves]} opacity="0.4" />
        </>
      )}

      {/* NECK */}
      <rect x="52" y="78" width="16" height="14" rx="4" fill="#d1b896" />

      {/* HEAD */}
      <ellipse cx="60" cy="62" rx="30" ry="34" fill="#d1b896" />

      {/* Cheek blush */}
      <ellipse cx="40" cy="68" rx="6" ry="4" fill="#f9a8d4" opacity="0.35" />
      <ellipse cx="80" cy="68" rx="6" ry="4" fill="#f9a8d4" opacity="0.35" />

      {/* EYES - big glowing cyan */}
      <ellipse cx="48" cy="62" rx="9" ry="10" fill="#0e7490" />
      <ellipse cx="72" cy="62" rx="9" ry="10" fill="#0e7490" />
      <ellipse cx="48" cy="62" rx="7" ry="8" fill="#06b6d4" />
      <ellipse cx="72" cy="62" rx="7" ry="8" fill="#06b6d4" />
      <ellipse cx="48" cy="62" rx="4" ry="5" fill="#0a0a0a" />
      <ellipse cx="72" cy="62" rx="4" ry="5" fill="#0a0a0a" />
      {/* Eye glow */}
      <ellipse cx="48" cy="62" rx="9" ry="10" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="72" cy="62" rx="9" ry="10" fill="none" stroke="#67e8f9" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </ellipse>
      {/* Eye shine */}
      <ellipse cx="45" cy="58" rx="2" ry="2.5" fill="white" opacity="0.8" />
      <ellipse cx="69" cy="58" rx="2" ry="2.5" fill="white" opacity="0.8" />

      {/* MOUTH - small smirk */}
      <path d="M54 76 Q60 80 66 76" fill="none" stroke="#8b6355" strokeWidth="1.5" strokeLinecap="round" />

      {/* HELMET OVERLAYS */}
      {/* No helmet = dark hood */}
      {!helmet && (
        <>
          <path d="M30 58 Q32 20 60 18 Q88 20 90 58 Q78 40 60 38 Q42 40 30 58 Z" fill="#111827" opacity="0.85" />
          <path d="M30 58 Q28 70 32 80 Q36 72 30 58 Z" fill="#111827" opacity="0.7" />
          <path d="M90 58 Q92 70 88 80 Q84 72 90 58 Z" fill="#111827" opacity="0.7" />
        </>
      )}
      {helmet === 'commun' && (
        <>
          <path d="M30 58 Q32 20 60 18 Q88 20 90 58 Q78 40 60 38 Q42 40 30 58 Z" fill="#374151" opacity="0.9" />
          <rect x="30" y="55" width="60" height="8" rx="4" fill="#4b5563" opacity="0.8" />
          <rect x="55" y="18" width="10" height="5" rx="2" fill="#6b7280" opacity="0.7" />
        </>
      )}
      {helmet === 'rare' && (
        <>
          <path d="M30 58 Q32 18 60 16 Q88 18 90 58 Q78 38 60 36 Q42 38 30 58 Z" fill="#1e3a8a" opacity="0.9" />
          <rect x="30" y="54" width="60" height="9" rx="4" fill="#1d4ed8" opacity="0.8" />
          <ellipse cx="60" cy="20" rx="7" ry="5" fill="#3b82f6" opacity="0.9" />
          <ellipse cx="60" cy="20" rx="4" ry="3" fill="#93c5fd" opacity="0.8" />
        </>
      )}
      {helmet === 'épique' && (
        <>
          <path d="M28 58 Q30 16 60 14 Q90 16 92 58 Q78 36 60 34 Q42 36 28 58 Z" fill="#3b0764" opacity="0.92" />
          <rect x="28" y="53" width="64" height="10" rx="4" fill="#6b21a8" opacity="0.85" />
          {/* Horns */}
          <path d="M36 42 L28 20 L44 38" fill="#4c1d95" stroke="#a855f7" strokeWidth="1.5" />
          <path d="M84 42 L92 20 L76 38" fill="#4c1d95" stroke="#a855f7" strokeWidth="1.5" />
          <ellipse cx="60" cy="16" rx="6" ry="4" fill="#a855f7" opacity="0.9" />
        </>
      )}
      {helmet === 'unique' && (
        <>
          <path d="M28 58 Q30 14 60 12 Q90 14 92 58 Q78 34 60 32 Q42 34 28 58 Z" fill="#7c2d12" opacity="0.92" />
          <rect x="28" y="52" width="64" height="11" rx="4" fill="#c2410c" opacity="0.85" />
          {/* Flame crown */}
          <path d="M50 28 L46 12 L54 24 L58 8 L60 22 L62 8 L66 24 L70 12 L74 28" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M50 28 L46 12 L54 24 L58 8 L60 22 L62 8 L66 24 L70 12 L74 28" fill="none" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.8s" repeatCount="indefinite" />
          </path>
        </>
      )}
      {helmet === 'mythique' && (
        <>
          <path d="M26 58 Q28 12 60 10 Q92 12 94 58 Q78 32 60 30 Q42 32 26 58 Z" fill="#451a03" opacity="0.92" />
          <rect x="26" y="51" width="68" height="12" rx="5" fill="#92400e" opacity="0.9" />
          {/* Divine golden helm */}
          <path d="M60 10 L55 18 L60 15 L65 18 Z" fill="#eab308" />
          <path d="M40 35 L34 22 L42 32" fill="#b45309" stroke="#eab308" strokeWidth="1.5" />
          <path d="M80 35 L86 22 L78 32" fill="#b45309" stroke="#eab308" strokeWidth="1.5" />
          <ellipse cx="60" cy="13" rx="5" ry="4" fill="#fef08a">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="1s" repeatCount="indefinite" />
          </ellipse>
          {/* Golden trim */}
          <path d="M26 58 Q28 12 60 10 Q92 12 94 58" fill="none" stroke="#eab308" strokeWidth="2" opacity="0.7" />
        </>
      )}

      {/* Subtle face shadow line */}
      <path d="M42 72 Q60 78 78 72" fill="none" stroke="#8b6355" strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}
