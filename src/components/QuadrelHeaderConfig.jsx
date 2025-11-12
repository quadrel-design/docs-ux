'use client'

import { useEffect } from 'react'

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

