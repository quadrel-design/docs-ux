'use client'

import { useEffect, useState } from 'react'

export default function DemoHeader({ children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const [pageTitle, setPageTitle] = useState('')
  const [useDemoHeader, setUseDemoHeader] = useState(false)
  
  useEffect(() => {
    // Check for data attribute set by DemoHeaderConfig
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
        justifyContent: 'space-between'
      }}
    >
      <div style={{ paddingLeft: '24px', fontSize: '1rem', fontWeight: 500, color: 'var(--x-color-black)' }}>
        {pageTitle}
      </div>
      {children}
    </header>
  )
}

