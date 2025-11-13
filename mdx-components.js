import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import QuadrelLightbox from './src/components/QuadrelLightbox'
import QuadrelMasonryGallery from './src/components/QuadrelMasonryGallery'
import QuadrelCard, { QuadrelCardGrid } from './src/components/QuadrelCard'
import QuadrelHeaderConfig from './src/components/QuadrelHeaderConfig'
import QuadrelMermaid from './src/components/QuadrelMermaid'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  QuadrelLightbox,
  QuadrelMasonryGallery,
  QuadrelCard,
  QuadrelCardGrid,
  QuadrelHeaderConfig,
  Mermaid: QuadrelMermaid, // Override default Mermaid component with custom styling
  ...components
})
