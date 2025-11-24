export default function QuadrelBack(props) {
  const { ThemeWrapper, children, toc, metadata, sourceCode } = props
  const theme = metadata?.theme || {}
  const showBackLink = theme.backLink
  const backHref = theme.backHref || '../'

  return (
    <ThemeWrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {showBackLink && (
        <p>
          <a href={backHref}>&lt; Back</a>
        </p>
      )}
      {children}
    </ThemeWrapper>
  )
}


