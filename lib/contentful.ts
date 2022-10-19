const fetchGraphQL = async (query:string, preview = false) => {
    const token = preview
        ? process.env.NEXT_PUBLIC_CTFL_PREVIEW_ACCESSTOKEN
        : process.env.NEXT_PUBLIC_CTFL_ACCESSTOKEN
    console.log('Running', query, token)
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CTFL_SPACE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json())
  }

export const getPage = async (slug:string, preview = false) => {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            title
            slug
          }
        }
      }`,
      preview
    )
    console.log('entry', entry)
    return entry.data?.pageCollection?.items?.[0]
}

export const getPages = async (preview = false) => {
    const entry = await fetchGraphQL(
      `query {
        pageCollection(preview: ${preview}) {
          items {
            title
            slug
          }
        }
      }`,
      preview
    )
    return entry.data?.pageCollection?.items
}

export {}