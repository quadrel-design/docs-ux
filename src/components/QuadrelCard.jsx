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
      className="q-card"
      style={{
        padding,
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 12,
        border: '1px solid var(--x-color-gray-200)',
        background: 'var(--x-color-white, #fff)',
        ...style
      }}
    >
      {/* icon */}
      <div className="q-icon" style={{ marginBottom: gap }}>{renderIcon()}</div>
      {/* 24px bottom gap */}
      <h3 className="q-title" style={{ marginBottom: gap, fontSize: '1.25rem' }}>{title}</h3>
      {/* 24px bottom gap */}
      <div className="q-body" style={{ marginBottom: gap }}>
        {text !== undefined ? <p>{text}</p> : children}
      </div>
      {/* link: no extra bottom spacer; card padding provides bottom space */}
      {(linkHref || typeof linkHref === 'string') && (
        <a
          href={linkHref.startsWith('/') ? `${basePath}${linkHref}` : linkHref}
          className="x:focus-visible:nextra-focus x:text-primary-600 x:underline x:hover:no-underline x:decoration-from-font x:[text-underline-position:from-font]"
          style={{ marginTop: 'auto' }}
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
  min = 200,
  max = 300,
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
