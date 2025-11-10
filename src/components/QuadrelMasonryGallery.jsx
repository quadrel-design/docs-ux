'use client'

import { useEffect, useMemo, useState } from 'react'
import { MasonryPhotoAlbum, RowsPhotoAlbum, ColumnsPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

export default function QuadrelMasonryGallery({
  photos = [],
  spacing = 12,
  columns,
  layout = 'masonry', // 'masonry' | 'rows' | 'columns'
  targetRowHeight = 260,
  maxWidth
}) {
  const [index, setIndex] = useState(-1)
  const [resolvedPhotos, setResolvedPhotos] = useState([])
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

  useEffect(() => {
    let cancelled = false
    const loadDimensions = async () => {
      const resolved = await Promise.all(
        normalizedPhotos.map(
          p =>
            new Promise(resolve => {
              if (p.width && p.height) {
                resolve(p)
                return
              }
              const img = new Image()
              img.onload = () => {
                const naturalWidth = img.naturalWidth || img.width
                const naturalHeight = img.naturalHeight || img.height
                // If only one dimension was provided, keep aspect by using natural sizes
                resolve({
                  ...p,
                  width: naturalWidth,
                  height: naturalHeight
                })
              }
              img.onerror = () => {
                // Fallback to square if we fail to load; avoids crash but keeps layout stable
                const fallbackSize = 1000
                resolve({
                  ...p,
                  width: p.width || fallbackSize,
                  height: p.height || fallbackSize
                })
              }
              img.src = p.src
            })
        )
      )
      if (!cancelled) {
        setResolvedPhotos(resolved)
      }
    }
    loadDimensions()
    return () => {
      cancelled = true
    }
  }, [normalizedPhotos])

  const slides = useMemo(
    () => {
      const displayPhotos =
        resolvedPhotos.length
          ? resolvedPhotos
          : normalizedPhotos.filter(p => p.width && p.height)
      return displayPhotos.map(p => ({
        src: p.src,
        title: p.title,
        description: p.description
      }))
    },
    [normalizedPhotos, resolvedPhotos]
  )

  return (
    <div style={maxWidth ? { maxWidth, margin: '0 auto' } : undefined}>
      {layout === 'rows' ? (
        <RowsPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          targetRowHeight={targetRowHeight}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
        />
      ) : layout === 'columns' ? (
        <ColumnsPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          columns={columns}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
        />
      ) : (
        <MasonryPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          columns={columns}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
        />
      )}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        carousel={{ finite: true }}
        plugins={[Captions]}
      />
    </div>
  )
}


