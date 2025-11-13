'use client'

import React from 'react'

/**
 * @typedef {Object} QuadrelCardProps
 * @property {string} title - The title of the card.
 * @property {string} [text] - The descriptive text content of the card. If children are provided, this will be ignored.
 * @property {string|React.ReactNode} [icon] - The icon to display on the card. Can be a URL string for an image or a React Node.
 * @property {React.ReactNode} [children] - React children to be rendered as the body of the card. Overrides `text` prop if provided.
 * @property {number} [padding=24] - The padding around the card content.
 * @property {number} [gap=24] - The spacing between elements within the card.
 * @property {React.CSSProperties} [style] - Custom CSS style for the card container.
 * @property {string} [linkHref] - The URL for the link at the bottom of the card.
 * @property {string} [linkLabel='Learn more →'] - The text for the link at the bottom of the card.
 */

/**
 * A customizable card component for displaying content with an optional icon, title, text, and a link.
 * It automatically handles internal Next.js links and external links.
 * @param {QuadrelCardProps} props - The properties for the QuadrelCard component.
 * @returns {JSX.Element} The rendered card component.
 */
export default function QuadrelCard({
  title,
  text,
  icon,
  children,
  padding = 24,
  gap = 24,
  style,
  linkHref,
  linkLabel = 'Learn more →'
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const renderIcon = () => {
    if (!icon) return null
    if (typeof icon === 'string') {
      const src =
        icon.startsWith('/') ? `${basePath}${icon}` : icon
      return (
        <img
          src={src}
          alt=""
          width={32}
          height={32}
          style={{ display: 'block', height: 32, width: 32, objectFit: 'contain' }}
        />
      )
    }
    // assume ReactNode
    try {
      if (React.isValidElement(icon)) {
        const prevStyle = (icon.props && icon.props.style) || {}
        return React.cloneElement(icon, {
          width: 32,
          height: 32,
          style: { ...prevStyle, width: 32, height: 32 }
        })
      }
    } catch {}
    return icon
  }

  const content = (
    <div
      className="q-card"
      style={{
        padding,
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 8,
        border: '1px solid var(--x-color-gray-200)',
        background: 'var(--x-color-white, #fff)',
        ...style
      }}
    >
      {/* icon */}
      <div className="q-icon" style={{ marginBottom: gap }}>{renderIcon()}</div>
      {/* 24px bottom gap */}
      <h3 className="q-title" style={{ marginBottom: gap, fontSize: '1.25rem' }}>{title}</h3>
      {/* 24px bottom gap */}
      <div className="q-body" style={{ marginBottom: gap }}>
        {text !== undefined ? <p>{text}</p> : children}
      </div>
      {/* link: no extra bottom spacer; card padding provides bottom space */}
      {(linkHref || typeof linkHref === 'string') && (
        <a
          href={linkHref.startsWith('/') ? `${basePath}${linkHref}` : linkHref}
          className="x:focus-visible:nextra-focus x:text-primary-600 x:underline x:hover:no-underline x:decoration-from-font x:[text-underline-position:from-font]"
          style={{ marginTop: 'auto' }}
        >
          {linkLabel}
        </a>
      )}
    </div>
  )

  return content
}

/**
 * @typedef {Object} QuadrelCardGridProps
 * @property {React.ReactNode} children - QuadrelCard components or other React nodes to be displayed in the grid.
 * @property {number} [gap=24] - The spacing between grid items.
 * @property {number} [min=200] - The minimum width of a grid item.
 * @property {number} [max=300] - The maximum width of a grid item.
 * @property {string} [columns='auto-fit'] - The CSS grid-template-columns value.
 * @property {React.CSSProperties} [style] - Custom CSS style for the grid container.
 */

/**
 * A grid container component for arranging QuadrelCard components.
 * It uses CSS Grid to create a responsive layout.
 * @param {QuadrelCardGridProps} props - The properties for the QuadrelCardGrid component.
 * @returns {JSX.Element} The rendered grid container.
 */
export function QuadrelCardGrid({
  children,
  gap = 24,
  min = 200,
  max = 300,
  columns = 'auto-fit',
  style
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(${min}px, 1fr))`,
        gap,
        ...style
      }}
    >
      {children}
    </div>
  )
}

// allow usage as <QuadrelCard.Grid>
QuadrelCard.Grid = QuadrelCardGrid
