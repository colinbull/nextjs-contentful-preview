import Link from 'next/link'
import { getPage } from '../../lib/contentful'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Page from "../[slug]";

const Preview = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [pageData, setPageData] = useState<any | null>(null)

  useEffect(() => {
      const loadPage = async (slug:string) => {
          setLoading(true)
          const page = await getPage(slug, true)
          setPageData(page)
          setLoading(false)
      }
      loadPage(router.query.slug as string)
  }, [router])

  const exit = () => {
    window.location.assign("/")
  }

  if(isLoading) {
      return <h1>Loading..</h1>
  } else {
      if(!pageData) {
          return <h1>Not found: {router.query.slug}</h1>
      }

      return <div>
          <button onClick={exit}>
              Exit preview mode
          </button>
          <Page {...pageData}></Page>
      </div>
  }
}

export default Preview
