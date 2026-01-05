import Link from 'next/link'

export default function QuadrelBack(props) {
  const { ThemeWrapper, children, toc, metadata, sourceCode } = props
  const theme = metadata?.theme || {}
  const showBackLink = theme.backLink
  const backHref = theme.backHref || '../'
  const isExternal =
    typeof backHref === 'string' &&
    (backHref.startsWith('http://') ||
      backHref.startsWith('https://') ||
      backHref.startsWith('mailto:') ||
      backHref.startsWith('tel:'))

  return (
    <ThemeWrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {showBackLink && (
        <p>
          {isExternal ? (
            <a href={backHref} rel="noopener noreferrer">
              &lt; Back
            </a>
          ) : (
            <Link href={backHref}>&lt; Back</Link>
          )}
        </p>
      )}
      {children}
    </ThemeWrapper>
  )
}


