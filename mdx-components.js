import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import QuadrelLightbox from './src/components/QuadrelLightbox'
import QuadrelMasonryGallery from './src/components/QuadrelMasonryGallery'
import QuadrelCard, { QuadrelCardGrid } from './src/components/QuadrelCard'
import QuadrelHeaderConfig from './src/components/QuadrelHeaderConfig'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  QuadrelLightbox,
  QuadrelMasonryGallery,
  QuadrelCard,
  QuadrelCardGrid,
  QuadrelHeaderConfig,
  ...components
})
