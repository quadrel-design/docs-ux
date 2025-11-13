'use client'

import { useEffect } from 'react'

/**
 * @typedef {Object} LayoutConfigProps
 * @property {string} layout - The layout type (e.g., 'full', 'default').
 */

/**
 * A client-side component that sets a `data-layout` attribute on the `document.body`
 * based on the `layout` prop. This allows CSS rules to be conditionally applied
 * based on the page's layout configuration.
 * @param {LayoutConfigProps} props - The properties for the LayoutConfig component.
 * @returns {null} This component does not render any visible elements, it only manages a DOM attribute.
 */
export default function LayoutConfig({ layout }) {
  useEffect(() => {
    if (layout) {
      document.body.setAttribute('data-layout', layout)
    } else {
      document.body.removeAttribute('data-layout')
    }
    
    return () => {
      document.body.removeAttribute('data-layout')
    }
  }, [layout])
  
  return null
}
