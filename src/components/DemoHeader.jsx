'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DemoHeader({ children }) {
  const pathname = usePathname()
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const isDemoPage = pathname?.includes('/floorplans/create/demo')
  const [pageTitle, setPageTitle] = useState('')
  
  useEffect(() => {
    if (isDemoPage) {
      // Get page title from document title, removing the template suffix
      const title = document.title.replace(' - Quadrel', '').trim()
      setPageTitle(title || 'Demo Use Case')
    }
  }, [isDemoPage])
  
  if (!isDemoPage) {
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

