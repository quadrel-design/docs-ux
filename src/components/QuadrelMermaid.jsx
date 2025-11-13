'use client'

import { useEffect, useId, useRef, useState } from 'react'

function useIsVisible(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        setIsIntersecting(true)
      }
    })
    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])
  return isIntersecting
}

export default function QuadrelMermaid({ chart }) {
  const id = useId()
  const [svg, setSvg] = useState('')
  const containerRef = useRef(null)
  const isVisible = useIsVisible(containerRef)

  useEffect(() => {
    if (!isVisible) {
      return
    }

    async function renderChart() {
      const { default: mermaid } = await import('mermaid')
      try {
        // Get CSS variables from the document root
        const style = getComputedStyle(document.documentElement)
        const primaryColor = style.getPropertyValue('--x-color-primary-600') || '#4CAF50'
        const primaryTextColor = style.getPropertyValue('--x-color-white') || '#fff'
        const primaryBorderColor = style.getPropertyValue('--x-color-gray-400') || '#9ca3af'
        const secondaryColor = style.getPropertyValue('--x-color-gray-100') || '#f9fafb'
        const lineColor = style.getPropertyValue('--x-color-gray-600') || '#4b5563'
        const textColor = style.getPropertyValue('--x-color-black') || '#000'
        const noteBkgColor = style.getPropertyValue('--x-color-gray-100') || '#f9fafb'
        const noteTextColor = style.getPropertyValue('--x-color-black') || '#000'
        const fontSize = style.getPropertyValue('--q-font-size-base') || '14px'
        const fontFamily = style.getPropertyValue('--q-font-family') || 'inherit'

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          fontFamily: fontFamily,
          theme: 'base',
          themeVariables: {
            primaryColor: primaryColor,
            primaryTextColor: primaryTextColor,
            primaryBorderColor: primaryBorderColor,
            secondaryColor: secondaryColor,
            lineColor: lineColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            nodeTextColor: textColor,
            noteBkgColor: noteBkgColor,
            noteTextColor: noteTextColor
          },
          themeCSS: 'margin: 1.5rem auto 0;'
        })

        // Clear any existing content
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }

        // Use chart as-is (init directive can be included inline in the chart)
        const chartContent = chart.replaceAll('\\n', '\n')

        const { svg: svg2 } = await mermaid.render(
          // strip invalid characters for `id` attribute
          id.replaceAll(':', ''),
          chartContent,
          containerRef.current
        )
        setSvg(svg2)
      } catch (error) {
        console.error('Error while rendering mermaid', error)
      }
    }

    renderChart()
  }, [chart, isVisible, id])

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svg }} />
}

