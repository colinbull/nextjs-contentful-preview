import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { getPage } from '../lib/contentful'
import Page from './[slug]'

const Home = (props:any) => {
  return <Page {...props}></Page>
}

export const getStaticProps :GetStaticProps = async (context) => {
  const data = await getPage("/", false)
  console.log(context.params, data)
  return {
    props: data,
  }
}

export default Home
