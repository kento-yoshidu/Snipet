import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Header from "../components/Header"
import PageInfo from "../components/PageInfo"

const Tag = ({ data, pageContext }) => {
  console.log(data)

  return (
    <Layout>
      <Header
        pageTitle={`${pageContext.tag} タグの記事`}
      />

      <PageInfo
        currentPage={pageContext.currentPage}
        postCount={pageContext.postCount}
        pageCount={pageContext.pageCount}
      />
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query Tag(
    $tag: String!,
    $limit: Int!,
    $skip: Int!
  ) {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___postdate],
        order: DESC
      }
      limit: $limit,
      skip: $skip
      filter: {
        frontmatter: {
          published: { eq: true }
          tags: {
            in: [$tag]
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
