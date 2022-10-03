import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Header from "../components/Header"
import PageInfo from "../components/PageInfo"
import PostList from "../components/PostList"
import { PageContext } from "../@types/types"

interface SeriesPageContext extends PageContext {
  seriesName: string
}

const Series = ({ data, pageContext }: { data: Queries.SeriesQuery, pageContext: SeriesPageContext }) => (
  <Layout>
    <Header
      pageTitle={`${pageContext.seriesName} シリーズの記事`}
    />

    <PageInfo
      currentPage={pageContext.currentPage}
      postCount={pageContext.postCount}
      pageCount={pageContext.pageCount}
    />

    <PostList
      postData={data}
    />
  </Layout>
)

export default Series

export const Head = ({ pageContext: { seriesName } }: { pageContext: { seriesName: string }}) => (
  <Seo
    title={`${seriesName} シリーズの記事一覧`}
  />
)

export const PageQuery = graphql`
  query Series(
    $seriesSlug: String!,
    $limit: Int!,
    $skip: Int!
  ) {
    allMarkdownRemark (
      sort: {
        fields: [frontmatter___postdate],
        order: DESC
      }
      limit: $limit,
      skip: $skip
      filter: {
        frontmatter: {
          published: { eq: true }
          seriesSlug: {
            eq: $seriesSlug
          }
        }
      }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          postdate(formatString: "YYYY-MM-DD")
          update(formatString: "YYYY-MM-DD")
          seriesName
          seriesSlug
          title
          tags
          description
        }
      }
    }
  }
`
