'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

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
        src={resolvedSrc}
        alt={alt}
        width={thumbWidth}
        style={{ cursor: 'zoom-in', height: 'auto', ...thumbStyle }}
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        carousel={{ finite: true }}
        styles={{
          container: {
            paddingTop: lightboxPaddingY,
            paddingBottom: lightboxPaddingY
          }
        }}
        plugins={[Captions]}
      />
    </>
  )
}


