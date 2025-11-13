'use client'

import { useEffect, useState } from 'react'

/**
 * @typedef {Object} QuadrelHeaderProps
 * @property {React.ReactNode} [children] - React children to be rendered alongside the page title in the header.
 */

/**
 * A custom header component that appears on pages configured with `useDemoHeader: true` in their front matter.
 * It displays the page title and can optionally render children components.
 * The header's visibility and content are controlled by the `data-use-demo-header` attribute on the `document.body`,
 * which is set by the `QuadrelHeaderConfig` component.
 * @param {QuadrelHeaderProps} props - The properties for the QuadrelHeader component.
 * @returns {JSX.Element | null} The rendered header component or null if not used on the current page.
 */
export default function QuadrelHeader({ children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const [pageTitle, setPageTitle] = useState('')
  const [useDemoHeader, setUseDemoHeader] = useState(false)
  
  useEffect(() => {
    // Check for data attribute set by QuadrelHeaderConfig
    const checkDemoHeader = () => {
      const shouldUse = document.body.getAttribute('data-use-demo-header') === 'true'
      setUseDemoHeader(shouldUse)
      
      if (shouldUse) {
        // Get page title from document title, removing the template suffix
        const title = document.title.replace(' - Quadrel', '').trim()
        setPageTitle(title || 'Demo Use Case')
        // Add class to body for easier CSS targeting
        document.body.classList.add('has-demo-header')
      } else {
        document.body.classList.remove('has-demo-header')
      }
    }
    
    // Check initially
    checkDemoHeader()
    
    // Watch for changes to the data attribute
    const observer = new MutationObserver(checkDemoHeader)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-use-demo-header']
    })
    
    return () => {
      observer.disconnect()
      document.body.classList.remove('has-demo-header')
    }
  }, [])
  
  if (!useDemoHeader) {
    return null
  }
  
  return (
    <header
      data-alternative-header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '64px', // Match Nextra navbar height
        backgroundColor: 'var(--x-color-white, #fff)',
        borderBottom: '1px solid var(--x-color-gray-200)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start' // Changed from 'space-between' for left alignment
      }}
    >
      <div style={{ paddingLeft: '24px', fontSize: '1rem', fontWeight: 500, color: 'var(--x-color-black)', textAlign: 'left' }}>
        {pageTitle}
      </div>
      {children}
    </header>
  )
}

