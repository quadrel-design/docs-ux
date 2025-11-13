/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Inter } from 'next/font/google'
import QuadrelHeader from '../components/QuadrelHeader'
import 'nextra-theme-docs/style.css'
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'react-photo-album/masonry.css'
import 'react-photo-album/rows.css'
import 'react-photo-album/columns.css'
import './globals.css'
import './variables.css'
import './components.css'
import './nextra-overrides.css'
import './demo-header.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
  metadataBase: new URL('https://quadrel-design.github.io/docs-ux/'),
  title: {
    template: '%s - Quadrel'
  },
  description: 'Quadrel - UX Architecture Guidelines',
  applicationName: 'Quadrel',
  generator: 'Next.js',
  appleWebApp: {
    title: 'Quadrel'
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-TileColor': '#fff'
  },
  twitter: {
    site: 'https://quadrel-design.github.io/docs-ux/'
  }
}

export default async function RootLayout({ children }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const navbar = (
    <Navbar
      logo={
      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <img src={`${basePath}/assets/admin/logo.svg`} alt="Logo" style={{ height: 24, width: 'auto' }} />
        <span style={{ opacity: '60%' }}> </span>
      </a>
      }
      // Next.js discord server
      chatLink="https://discord.gg/hEM84NMkRv"
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={inter.className}>
      <Head faviconGlyph="✦" />
      <body>
        <QuadrelHeader />
        <Layout
          navbar={navbar}
          footer={<Footer>DaziT {new Date().getFullYear()} © Quadrel</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/quadrel-design/docs-ux/blob/main/"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
