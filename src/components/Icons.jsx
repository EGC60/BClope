import React from 'react'

export function FlameIcon({ size = 20, color = '#f97316', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2C12 2 7 7 7 13a5 5 0 0010 0C17 7 12 2 12 2z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M12 6C12 6 9.5 9.5 9.5 13a2.5 2.5 0 005 0C14.5 9.5 12 6 12 6z"
        fill="#fbbf24"
        opacity="0.7"
      />
      <path
        d="M12 10C12 10 11 11.5 11 13a1 1 0 002 0C13 11.5 12 10 12 10z"
        fill="#fff"
        opacity="0.5"
      />
    </svg>
  )
}

export function KeyIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="4.5" stroke={color} strokeWidth="1.8" fill="none" />
      <circle cx="8" cy="8" r="2" fill={color} opacity="0.4" />
      <line x1="11.5" y1="11.5" x2="20" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="17" y1="18" x2="17" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="19" y1="16" x2="19" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function ChestIcon({ size = 24, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="2" y="10" width="20" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M2 10 Q2 5 12 5 Q22 5 22 10" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="2" y1="13" x2="22" y2="13" stroke={color} strokeWidth="1" opacity="0.5" />
      <rect x="10" y="12" width="4" height="4" rx="1" fill={color} />
    </svg>
  )
}

export function SmokeIcon({ size = 20, color = 'white', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Cigarette body */}
      <rect x="3" y="11" width="13" height="3" rx="1.5" fill={color} opacity="0.9" />
      <rect x="16" y="11" width="5" height="3" rx="1.5" fill={color} opacity="0.4" />
      {/* Smoke wisps */}
      <path d="M6 11 Q7 8 6 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M9 11 Q11 7 9 4" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Cross out */}
      <line x1="2" y1="3" x2="22" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  )
}

export function ResistIcon({ size = 20, color = 'white', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Shield shape */}
      <path
        d="M12 3L4 7v5c0 4.5 3.5 8.5 8 10 4.5-1.5 8-5.5 8-10V7L12 3z"
        stroke={color}
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Fist/checkmark inside */}
      <path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SwordIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Blade */}
      <line x1="5" y1="19" x2="17" y2="7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Tip */}
      <path d="M17 7 L19 5 L17 7z" fill={color} />
      {/* Crossguard */}
      <line x1="9" y1="15" x2="13" y2="11" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="7" y1="17" x2="11" y2="13" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      {/* Pommel */}
      <circle cx="4.5" cy="19.5" r="1.5" fill={color} opacity="0.8" />
    </svg>
  )
}

export function ShieldIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2L4 6v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6L12 2z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.12"
        strokeLinejoin="round"
      />
      <path
        d="M12 6L8 8.5v4c0 2.5 1.8 4.8 4 5.5 2.2-.7 4-3 4-5.5v-4L12 6z"
        fill={color}
        fillOpacity="0.2"
      />
    </svg>
  )
}

export function HelmetIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Helmet dome */}
      <path
        d="M5 14C5 9 8 4 12 4C16 4 19 9 19 14"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.15"
        strokeLinecap="round"
      />
      {/* Brim */}
      <path d="M3 14 Q3 17 6 17 H18 Q21 17 21 14" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Visor slit */}
      <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Nasal */}
      <line x1="12" y1="14" x2="12" y2="17" stroke={color} strokeWidth="1.2" opacity="0.5" />
    </svg>
  )
}

export function BootIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 3 L7 14 Q7 17 10 17 L17 17 Q20 17 20 15 Q20 13 17 13 L13 13 L13 3 Z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.15"
        strokeLinejoin="round"
      />
      {/* Laces */}
      <line x1="9" y1="6" x2="13" y2="6" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="9" x2="13" y2="9" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

export function GloveIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Palm */}
      <path
        d="M6 10 L6 17 Q6 20 10 20 L14 20 Q18 20 18 16 L18 10 Q18 8 16 8 L15 8 L15 6 Q15 4 13 4 Q11 4 11 6 L11 8 L10 8 Q8 8 8 10 L7 10 Q6 10 6 10z"
        stroke={color}
        strokeWidth="1.5"
        fill={color}
        fillOpacity="0.15"
        strokeLinejoin="round"
      />
      {/* Fingers separation lines */}
      <line x1="11" y1="8" x2="11" y2="13" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="15" y1="8" x2="15" y2="13" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

export function RingIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="13" r="6" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Gem on top */}
      <path d="M10 8 L12 5 L14 8 Z" fill={color} opacity="0.8" />
      <path d="M10 8 L14 8" stroke={color} strokeWidth="1" />
      {/* Gem facets */}
      <line x1="12" y1="5" x2="12" y2="8" stroke={color} strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}

export function AmuletIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Chain */}
      <path d="M8 3 Q12 2 16 3" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="8" y1="3" x2="12" y2="10" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <line x1="16" y1="3" x2="12" y2="10" stroke={color} strokeWidth="1.2" opacity="0.7" />
      {/* Pendant — teardrop */}
      <path
        d="M12 10 Q8 14 9 17 Q9.5 21 12 21 Q14.5 21 15 17 Q16 14 12 10z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.2"
      />
      {/* Gem center */}
      <circle cx="12" cy="17" r="1.5" fill={color} opacity="0.7" />
    </svg>
  )
}

export function ArmorIcon({ size = 20, color = '#c9a84c', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Chest plate */}
      <path
        d="M7 4 L5 8 L5 16 Q5 19 12 20 Q19 19 19 16 L19 8 L17 4 Q14.5 6 12 6 Q9.5 6 7 4z"
        stroke={color}
        strokeWidth="1.8"
        fill={color}
        fillOpacity="0.15"
        strokeLinejoin="round"
      />
      {/* Center ridge */}
      <line x1="12" y1="6" x2="12" y2="19" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Shoulder pads */}
      <path d="M5 8 Q3 7 3 10 Q3 12 5 12" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M19 8 Q21 7 21 10 Q21 12 19 12" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}
