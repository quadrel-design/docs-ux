'use client'

export default function QuadrelCard({
  href,
  title,
  icon,
  children,
  padding = 24,
  gap = 24,
  style
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
      <div style={{ marginTop: gap }}>{children}</div>
    </div>
  )

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </a>
    )
  }
  return content
}


