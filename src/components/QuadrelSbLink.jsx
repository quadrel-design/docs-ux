export default function QuadrelSbLink({ href, children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const targetHref = href && href.startsWith('/') ? `${basePath}${href}` : href

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      <img
        src={`${basePath}/assets/admin/logo-storybook.svg`}
        alt="Storybook"
        style={{ height: 24, width: 'auto' }}
      />
      <span>{children}</span>
    </a>
  )
}


