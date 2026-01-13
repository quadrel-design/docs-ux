export default function QuadrelFigmaLink({
  href,
  children,
  my,
  marginTop,
  marginBottom,
  style
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const targetHref = href && href.startsWith('/') ? `${basePath}${href}` : href
  const mt = my ?? marginTop ?? 8
  const mb = my ?? marginBottom ?? 8

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: mt,
        marginBottom: mb,
        ...style
      }}
    >
      <img
        src={`${basePath}/assets/admin/figma-icon.svg`}
        alt="Figma"
        style={{ height: 24, width: 'auto' }}
      />
      <span>{children}</span>
    </a>
  )
}

