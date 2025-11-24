import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import QuadrelLightbox from './src/components/QuadrelLightbox'
import QuadrelMasonryGallery from './src/components/QuadrelMasonryGallery'
import QuadrelCard, { QuadrelCardGrid } from './src/components/QuadrelCard'
import QuadrelMermaid from './src/components/QuadrelMermaid'
import QuadrelBack from './src/components/QuadrelBack'
import QuadrelSbLink from './src/components/QuadrelSbLink'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  QuadrelLightbox,
  QuadrelMasonryGallery,
  QuadrelCard,
  QuadrelCardGrid,
  Mermaid: QuadrelMermaid, // Override default Mermaid component with custom styling
  QuadrelSbLink,
  wrapper: props => <QuadrelBack {...props} ThemeWrapper={docsComponents.wrapper} />,
  ...components
})
