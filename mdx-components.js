import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import OneImageLightbox from './src/components/OneImageLightbox'

const docsComponents = getDocsMDXComponents()

export const useMDXComponents = components => ({
  ...docsComponents,
  OneImageLightbox,
  ...components
})
