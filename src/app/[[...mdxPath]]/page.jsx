import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'
import LayoutConfig from '../../../src/components/LayoutConfig'

const baseGenerate = generateStaticParamsFor('mdxPath')
export async function generateStaticParams() {
  const params = await baseGenerate()
  return [{ mdxPath: [] }, ...params]
}

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode
  } = await importPage(params.mdxPath)
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <LayoutConfig layout={metadata?.theme?.layout} />
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
