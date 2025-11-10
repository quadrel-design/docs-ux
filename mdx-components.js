import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import QuadrelLightbox from './src/components/QuadrelLightbox'
import QuadrelMasonryGallery from './src/components/QuadrelMasonryGallery'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  QuadrelLightbox,
  QuadrelMasonryGallery,
  ...components
})
