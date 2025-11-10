'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

export default function OneImageLightbox({
  src,
  alt = '',
  title,
  description,
  thumbWidth = 320
}) {
  const [open, setOpen] = useState(false)
  const slides = [{ src, title, description }]

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={thumbWidth}
        style={{ cursor: 'zoom-in', height: 'auto' }}
        onClick={() => setOpen(true)}
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Captions]}
      />
    </>
  )
}


