'use client'

import { cn } from '@/lib/utils'
import type React from 'react'

export interface LiquidGlassProps {
  variant?: 'button' | 'card' | 'panel' | 'pill'
  intensity?: 'subtle' | 'normal' | 'strong'
  tint?: string
  animate?: boolean
  glow?: string
  radius?: string | number
  shadow?: string
  as?: 'div' | 'button' | 'a'
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLElement>
  href?: string
  disabled?: boolean
  'aria-label'?: string
  id?: string
}

const intensityConfig = {
  subtle: {
    backdropFilter: 'blur(16px) brightness(1.04) saturate(1.25)',
    bgOpacity: 0.04,
    borderOpacity: 0.09,
    specularOpacity: 0.15,
    refractionOpacity: 0.08,
    refractionScale: 14,
    depthTop: 0.10,
  },
  normal: {
    backdropFilter: 'blur(28px) brightness(1.08) saturate(1.5)',
    bgOpacity: 0.07,
    borderOpacity: 0.14,
    specularOpacity: 0.27,
    refractionOpacity: 0.14,
    refractionScale: 22,
    depthTop: 0.18,
  },
  strong: {
    backdropFilter: 'blur(42px) brightness(1.12) saturate(1.75)',
    bgOpacity: 0.11,
    borderOpacity: 0.22,
    specularOpacity: 0.42,
    refractionOpacity: 0.22,
    refractionScale: 32,
    depthTop: 0.28,
  },
} as const

const variantConfig = {
  button: {
    borderRadius: '14px',
    padding: '10px 22px',
    display: 'inline-flex' as const,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    alignItems: 'center' as const,
    gap: '8px',
  },
  card: {
    borderRadius: '20px',
    padding: '24px',
    display: 'block' as const,
    cursor: 'default',
    fontSize: undefined,
    fontWeight: undefined,
  },
  panel: {
    borderRadius: '28px',
    padding: '32px',
    display: 'block' as const,
    cursor: 'default',
    fontSize: undefined,
    fontWeight: undefined,
  },
  pill: {
    borderRadius: '100px',
    padding: '7px 18px',
    display: 'inline-flex' as const,
    cursor: 'default',
    fontSize: '13px',
    fontWeight: 500,
    alignItems: 'center' as const,
    gap: '6px',
  },
} as const

function computeRootShadow(glow?: string, shadowOverride?: string): string {
  if (shadowOverride === 'none') return 'none'
  if (shadowOverride) return shadowOverride
  const base = '0 4px 6px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.30), 0 20px 60px rgba(0,0,0,0.20)'
  if (!glow) return base
  // glow accepts rgba strings directly, e.g. 'rgba(124,58,237,0.8)' or hex '#7c3aed'
  const glowColor = glow.startsWith('#') ? hexToRgba(glow, 0.3) : glow
  const glowOutline = glow.startsWith('#') ? hexToRgba(glow, 0.4) : glow
  return `${base}, 0 0 0 1px ${glowOutline}, 0 0 28px ${glowColor}`
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// SVG filter definitions — rendered once per component instance, zero-size hidden element
function LiquidGlassFilters() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* subtle: scale=14 */}
        <filter
          id="liquid-glass-distort-subtle"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.021"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix in="displaced" type="saturate" values="1.8" />
        </filter>

        {/* normal: scale=22 */}
        <filter
          id="liquid-glass-distort-normal"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.021"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix in="displaced" type="saturate" values="1.8" />
        </filter>

        {/* strong: scale=32 */}
        <filter
          id="liquid-glass-distort-strong"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.021"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="32"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feColorMatrix in="displaced" type="saturate" values="1.8" />
        </filter>
      </defs>
    </svg>
  )
}

export function LiquidGlass({
  variant = 'card',
  intensity = 'normal',
  tint,
  animate = false,
  glow,
  radius,
  shadow,
  as,
  children,
  className,
  style,
  onClick,
  href,
  disabled,
  'aria-label': ariaLabel,
  id,
}: LiquidGlassProps) {
  const Tag = (as ?? 'div') as React.ElementType
  const ic = intensityConfig[intensity]
  const vc = variantConfig[variant]

  const resolvedRadius =
    radius != null ? (typeof radius === 'number' ? `${radius}px` : radius) : vc.borderRadius

  const layerBase: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  }

  // Layer 1 — backdrop blur
  const layer1Style: React.CSSProperties = {
    ...layerBase,
    backdropFilter: ic.backdropFilter,
    WebkitBackdropFilter: ic.backdropFilter,
    zIndex: 0,
  }

  // Layer 2 — glass fill
  const layer2Style: React.CSSProperties = {
    ...layerBase,
    background: tint ?? `rgba(255,255,255,${ic.bgOpacity})`,
    zIndex: 1,
  }

  // Layer 3 — refraction simulation (SVG displacement map distorts these gradients)
  const layer3Style: React.CSSProperties = {
    ...layerBase,
    background: [
      'radial-gradient(ellipse 130% 90% at 50% -15%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.03) 55%, transparent 72%)',
      'radial-gradient(ellipse 70% 50% at 85% 115%, rgba(255,255,255,0.07) 0%, transparent 50%)',
    ].join(', '),
    filter: `url(#liquid-glass-distort-${intensity})`,
    opacity: ic.refractionOpacity,
    zIndex: 2,
    ...(animate
      ? { animation: 'liquid-refraction 9s ease-in-out infinite' }
      : {}),
  }

  // Layer 4 — specular blob (top highlight)
  const layer4Style: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '72%',
    height: '60%',
    pointerEvents: 'none',
    background: `radial-gradient(ellipse 80% 55% at 50% 0%, rgba(255,255,255,${ic.specularOpacity}) 0%, rgba(255,255,255,${ic.specularOpacity * 0.5}) 35%, transparent 80%)`,
    zIndex: 3,
    ...(animate
      ? { animation: 'liquid-specular 6s ease-in-out infinite' }
      : {}),
  }

  // Layer 4b — specular arc (thin bright line at top edge)
  const layer4bStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: '8%',
    right: '8%',
    height: '2px',
    pointerEvents: 'none',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.40) 20%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.40) 80%, transparent 100%)',
    filter: 'blur(0.5px)',
    borderRadius: '0 0 50% 50%',
    zIndex: 3,
  }

  // Layer 5 — depth / glass thickness (inset edge highlights)
  const layer5Style: React.CSSProperties = {
    ...layerBase,
    boxShadow: [
      `inset 0 1.5px 0 rgba(255,255,255,${ic.depthTop})`,
      'inset 0 -1px 0 rgba(0,0,0,0.10)',
      'inset 1px 0 0 rgba(255,255,255,0.08)',
      'inset -1px 0 0 rgba(255,255,255,0.08)',
    ].join(', '),
    zIndex: 4,
  }

  // Layer 6 — shimmer sweep (only when animate)
  const layer6Style: React.CSSProperties = animate
    ? {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '40%',
        pointerEvents: 'none',
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        animation: 'liquid-shimmer-sweep 4s ease-in-out infinite',
        animationDelay: '1.5s',
        zIndex: 5,
      }
    : {}

  const rootStyle: React.CSSProperties = {
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    borderRadius: resolvedRadius,
    border: `1px solid rgba(255,255,255,${ic.borderOpacity})`,
    display: vc.display,
    cursor: vc.cursor,
    padding: vc.padding,
    ...(vc.fontSize ? { fontSize: vc.fontSize } : {}),
    ...(vc.fontWeight ? { fontWeight: vc.fontWeight } : {}),
    ...('alignItems' in vc ? { alignItems: vc.alignItems } : {}),
    ...('gap' in vc ? { gap: vc.gap } : {}),
    boxShadow: computeRootShadow(glow, shadow),
    ...style,
  }

  const contentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
  }

  const tagProps: Record<string, unknown> = {
    className: cn(className),
    style: rootStyle,
    onClick,
    id,
    'aria-label': ariaLabel,
  }

  if (as === 'button') {
    tagProps.disabled = disabled
    tagProps.type = 'button'
  }
  if (as === 'a') {
    tagProps.href = href
  }

  return (
    <Tag {...tagProps}>
      <LiquidGlassFilters />

      {/* Layer 1: backdrop blur */}
      <div style={layer1Style} />

      {/* Layer 2: glass fill / tint */}
      <div style={layer2Style} />

      {/* Layer 3: refraction simulation */}
      <div style={layer3Style} />

      {/* Layer 4: specular blob + arc */}
      <div style={layer4Style} />
      <div style={layer4bStyle} />

      {/* Layer 5: depth / glass thickness */}
      <div style={layer5Style} />

      {/* Layer 6: shimmer sweep (animate only) */}
      {animate && <div style={layer6Style} />}

      {/* Content */}
      <div style={contentStyle}>{children}</div>
    </Tag>
  )
}

export default LiquidGlass
