'use client'

import { useMemo, useState } from 'react'
import { MasonryPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

export default function QuadrelMasonryGallery({
  photos = [],
  spacing = 8,
  columns
}) {
  const [index, setIndex] = useState(-1)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const normalizedPhotos = useMemo(() => {
    return photos.map(photo => {
      const src =
        typeof photo.src === 'string' && photo.src.startsWith('/')
          ? `${basePath}${photo.src}`
          : photo.src
      return { ...photo, src }
    })
  }, [photos, basePath])

  const slides = useMemo(
    () =>
      normalizedPhotos.map(p => ({
        src: p.src,
        title: p.title,
        description: p.description
      })),
    [normalizedPhotos]
  )

  return (
    <>
      <MasonryPhotoAlbum
        photos={normalizedPhotos}
        spacing={spacing}
        columns={columns}
        onClick={({ index: i }) => setIndex(i)}
        defaultContainerWidth={1168}
      />
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Captions]}
      />
    </>
  )
}


