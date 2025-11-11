'use client'

export default function QuadrelCard({
  title,
  text,
  icon,
  children,
  padding = 24,
  gap = 24,
  style,
  linkHref,
  linkLabel = 'Learn more →'
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const renderIcon = () => {
    if (!icon) return null
    if (typeof icon === 'string') {
      const src =
        icon.startsWith('/') ? `${basePath}${icon}` : icon
      return <img src={src} alt="" style={{ height: 24 }} />
    }
    // assume ReactNode
    return icon
  }

  const content = (
    <div
      style={{
        padding,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 12,
        border: '1px solid var(--x-color-gray-200)',
        background: 'var(--x-color-white, #fff)',
        ...style
      }}
    >
      {/* icon */}
      <div>{renderIcon()}</div>
      {/* 24px gap */}
      <h3 style={{ marginTop: gap, fontSize: '1.25rem' }}>{title}</h3>
      {/* 24px gap */}
      <div style={{ marginTop: gap }}>
        {text !== undefined ? <p>{text}</p> : children}
      </div>
      {/* spacer to push link to bottom */}
      <div style={{ flex: '1 1 auto' }} />
      {/* 24px gap to link */}
      {(linkHref || typeof linkHref === 'string') && (
        <a
          href={linkHref.startsWith('/') ? `${basePath}${linkHref}` : linkHref}
          className="nx-mt-6 nx-inline-block nx-text-primary-600 hover:nx-underline nx-underline-offset-2"
          style={gap !== 24 ? { marginTop: gap } : undefined}
        >
          {linkLabel}
        </a>
      )}
    </div>
  )

  return content
}

export function QuadrelCardGrid({
  children,
  gap = 24,
  min = 220,
  columns = 'auto-fit',
  style
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(${min}px, 1fr))`,
        gap,
        ...style
      }}
    >
      {children}
    </div>
  )
}

// allow usage as <QuadrelCard.Grid>
QuadrelCard.Grid = QuadrelCardGrid
