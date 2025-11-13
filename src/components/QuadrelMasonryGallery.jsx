'use client'

import { useEffect, useMemo, useState } from 'react'
import { MasonryPhotoAlbum, RowsPhotoAlbum, ColumnsPhotoAlbum } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'

/**
 * @typedef {Object} Photo
 * @property {string} src - The URL of the image.
 * @property {number} [width] - The width of the image.
 * @property {number} [height] - The height of the image.
 * @property {string} [title] - The title of the image for the lightbox caption.
 * @property {string} [description] - The description of the image for the lightbox caption.
 */

/**
 * @typedef {Object} QuadrelMasonryGalleryProps
 * @property {Photo[]} [photos=[]] - An array of photo objects, each with a `src` and optional `width`, `height`, `title`, and `description`.
 * @property {number} [spacing=12] - The spacing between photos in the gallery.
 * @property {number | Object} [columns] - The number of columns for the masonry or columns layout. Can be a number or an object for responsive columns (e.g., `{ xs: 1, sm: 2, md: 3 }`).
 * @property {'masonry' | 'rows' | 'columns'} [layout='masonry'] - The layout type for the gallery.
 * @property {number} [targetRowHeight=260] - The target row height for the 'rows' layout.
 * @property {number} [maxWidth] - The maximum width of the gallery container.
 * @property {React.CSSProperties} [containerStyle] - Custom CSS style for the gallery container.
 * @property {number} [lightboxPaddingY=48] - The vertical padding for the lightbox carousel.
 */

/**
 * A responsive image gallery component that supports masonry, rows, and columns layouts.
 * It uses `react-photo-album` for layout and `yet-another-react-lightbox` for the lightbox functionality.
 * Image dimensions are automatically resolved if not provided.
 * @param {QuadrelMasonryGalleryProps} props - The properties for the QuadrelMasonryGallery component.
 * @returns {JSX.Element} The rendered image gallery component.
 */
export default function QuadrelMasonryGallery({
  photos = [],
  spacing = 12,
  columns,
  layout = 'masonry', // 'masonry' | 'rows' | 'columns'
  targetRowHeight = 260,
  maxWidth,
  containerStyle,
  lightboxPaddingY = 48
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
    <div style={{ ...(maxWidth ? { maxWidth, margin: '0 auto' } : {}), ...(containerStyle || {}) }}>
      {layout === 'rows' ? (
        <RowsPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          targetRowHeight={targetRowHeight}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
          renderPhoto={({ imageProps, wrapperStyle }) => (
            <div style={{ ...wrapperStyle, border: '1px solid var(--x-color-gray-200)', borderRadius: 8, overflow: 'hidden' }}>
              <img {...imageProps} style={{ ...imageProps.style, display: 'block' }} />
            </div>
          )}
        />
      ) : layout === 'columns' ? (
        <ColumnsPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          columns={columns}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
          renderPhoto={({ imageProps, wrapperStyle }) => (
            <div style={{ ...wrapperStyle, border: '1px solid var(--x-color-gray-200)', borderRadius: 8, overflow: 'hidden' }}>
              <img {...imageProps} style={{ ...imageProps.style, display: 'block' }} />
            </div>
          )}
        />
      ) : (
        <MasonryPhotoAlbum
          photos={resolvedPhotos.length ? resolvedPhotos : normalizedPhotos.filter(p => p.width && p.height)}
          spacing={spacing}
          columns={columns}
          onClick={({ index: i }) => setIndex(i)}
          defaultContainerWidth={1168}
          renderPhoto={({ imageProps, wrapperStyle }) => (
            <div style={{ ...wrapperStyle, border: '1px solid var(--x-color-gray-200)', borderRadius: 8, overflow: 'hidden' }}>
              <img {...imageProps} style={{ ...imageProps.style, display: 'block' }} />
            </div>
          )}
        />
      )}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        carousel={{ finite: true, padding: `${lightboxPaddingY}px` }}
        thumbnails={{ hidden: true }}
        plugins={[Captions]}
      />
    </div>
  )
}


