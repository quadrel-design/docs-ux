'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'

/**
 * @typedef {Object} QuadrelLightboxProps
 * @property {string} src - The URL of the image to display in the lightbox. Can be a relative path (e.g., /assets/image.png) or an absolute URL.
 * @property {string} [alt=''] - The alt text for the image thumbnail.
 * @property {string} [title] - The title to display in the lightbox caption.
 * @property {string} [description] - The description to display in the lightbox caption.
 * @property {number} [thumbWidth=320] - The width of the image thumbnail on the page.
 * @property {React.CSSProperties} [thumbStyle={}] - Custom CSS style for the image thumbnail.
 * @property {number} [lightboxPaddingY=48] - The vertical padding for the lightbox carousel.
 */

/**
 * A customizable lightbox component that displays an image thumbnail, which expands into a full-screen lightbox on click.
 * It uses `yet-another-react-lightbox` for the lightbox functionality.
 * @param {QuadrelLightboxProps} props - The properties for the QuadrelLightbox component.
 * @returns {JSX.Element} The rendered image thumbnail and lightbox component.
 */
export default function QuadrelLightbox({
  src,
  alt = '',
  title,
  description,
  thumbWidth = 320,
  thumbStyle = {},
  lightboxPaddingY = 48
}) {
  const [open, setOpen] = useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const resolvedSrc = typeof src === 'string' && src.startsWith('/') ? `${basePath}${src}` : src
  const slides = [{ src: resolvedSrc, title, description }]

  return (
    <>
      <img
        className="quadrel-thumb"
        src={resolvedSrc}
        alt={alt}
        width={thumbWidth}
        style={{
          cursor: 'zoom-in',
          height: 'auto',
          border: '1px solid var(--x-color-gray-200)',
          borderRadius: 8,
          ...thumbStyle
        }}
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        carousel={{ finite: true, padding: `${lightboxPaddingY}px` }}
        thumbnails={{ hidden: true }}
        plugins={[Captions, Thumbnails]}
      />
    </>
  )
}


