import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Header from "../components/Header"
import PageInfo from "../components/PageInfo"
import PostList from "../components/PostList"
import { PageContext } from "../@types/types"

interface TagPageContext extends PageContext {
  tag: string
}

const Tag = ({ data, pageContext }: { data: Queries.TagQuery, pageContext: TagPageContext }) => (
  <Layout>
    <Header
      pageTitle={`${pageContext.tag} タグの記事`}
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

export default Tag

export const Head = ({ pageContext: { tag } }: { pageContext: { tag: string }}) => (
  <Seo
    title={`${tag} タグの記事一覧`}
  />
)

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
