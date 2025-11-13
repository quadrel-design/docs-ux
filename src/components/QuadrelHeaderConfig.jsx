'use client'

import { useEffect } from 'react'

/**
 * @typedef {Object} QuadrelHeaderConfigProps
 * @property {boolean} useDemoHeader - If true, the `data-use-demo-header` attribute will be set on the `document.body`,
 *                                      signaling the `QuadrelHeader` component to render.
 */

/**
 * A client-side component that sets a data attribute on the `document.body` based on the `useDemoHeader` prop.
 * This attribute is used by the `QuadrelHeader` component to conditionally render and display custom header content.
 * @param {QuadrelHeaderConfigProps} props - The properties for the QuadrelHeaderConfig component.
 * @returns {null} This component does not render any visible elements, it only manages a DOM attribute.
 */
export default function QuadrelHeaderConfig({ useDemoHeader }) {
  useEffect(() => {
    if (useDemoHeader) {
      document.body.setAttribute('data-use-demo-header', 'true')
    } else {
      document.body.removeAttribute('data-use-demo-header')
    }
    
    return () => {
      document.body.removeAttribute('data-use-demo-header')
    }
  }, [useDemoHeader])
  
  return null
}

