import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import QuadrelLightbox from './src/components/QuadrelLightbox'
import QuadrelMasonryGallery from './src/components/QuadrelMasonryGallery'
import QuadrelCard, { QuadrelCardGrid } from './src/components/QuadrelCard'
import QuadrelMermaid from './src/components/QuadrelMermaid'

const docsComponents = getDocsMDXComponents()

function QuadrelWrapper(props) {
  const { wrapper: ThemeWrapper } = docsComponents
  const { children, toc, metadata, sourceCode } = props
  const theme = metadata?.theme || {}
  const showBackLink = theme.backLink
  const backHref = theme.backHref

  return (
    <ThemeWrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      {showBackLink && backHref && (
        <p>
          <a href={backHref}>&lt; Back</a>
        </p>
      )}
      {children}
    </ThemeWrapper>
  )
}

export const useMDXComponents = components => ({
  ...docsComponents,
  QuadrelLightbox,
  QuadrelMasonryGallery,
  QuadrelCard,
  QuadrelCardGrid,
  Mermaid: QuadrelMermaid, // Override default Mermaid component with custom styling
  wrapper: QuadrelWrapper,
  ...components
})
