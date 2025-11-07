import nextra from 'nextra'

const withNextra = nextra({
  latex: true
})

export default withNextra({
  output: 'export',
  basePath: process.env.BASE_PATH || '',
  assetPrefix: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true
})
