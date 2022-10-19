import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getPage } from '../lib/contentful'

type PageFields = {
  preview:boolean
  title:string
}

const Page = (fields:PageFields) => {

  return (<div>
    {fields.preview ?
      <Link href="/api/exit-preview">
          Click here to exit preview mode.
      </Link> : null }      
    <h1>{fields.title}</h1>
  </div>)
}

export const getStaticProps :GetStaticProps = async (context) => {
  const data = await getPage(context.params?.slug as string, context.preview)
  console.log(context.params, data)
  return {
    props: {preview : context.preview ?? false, ...data },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'second-page' } }],
    fallback: true,
  }
}

export default Page