import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Header from "../components/Header"
import PageInfo from "../components/PageInfo"
import PostList from "../components/PostList"

const Series = ({ data, pageContext }: { data: Queries.SeriesQuery, pageContext: any }) => (
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
      postData={data.allMarkdownRemark}
    />

    <h1>Series</h1>
  </Layout>
)

export default Series

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
