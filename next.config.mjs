import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  themeConfig: {
    copyPageButton: true
  }
})

export default withNextra({
  output: 'export',
  basePath: process.env.BASE_PATH || '',
  assetPrefix: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || ''
  },
  trailingSlash: true
})
