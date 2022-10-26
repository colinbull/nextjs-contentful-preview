import { GetStaticProps } from 'next'
import { getPage } from '../lib/contentful'

type PageFields = {
  title:string
}

const Page = (fields:PageFields) => {

  return (<div>
    <h1>{fields.title}</h1>
  </div>)
}

export const getStaticProps :GetStaticProps = async (context) => {
  const data = await getPage(context.params?.slug as string)
  return {
    props: data
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'second-page' } }],
    fallback: true,
  }
}

export default Page
