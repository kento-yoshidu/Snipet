import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

type PageProps = {
  data: Queries.AllArticlesQuery
  pageContext: {
    postCount: number
    pageCount: number
    totalPageCount: number
    skip: number
    limit: number
    currentPage: number
    isFirst: boolean
    isLast: boolean
  }
}

const ArticleList = ({ data, pageContext }: PageProps) => (
  <Layout>
    {data.allMarkdownRemark.nodes.map((node) => (
      <p key={node.frontmatter?.title}>
        <Link to={node.fields?.slug}>{node.frontmatter?.title}</Link>
      </p>
    ))}
  </Layout>
)

export default ArticleList

export const pageQuery = graphql`
  query AllArticles(
    $limit: Int!,
    $skip: Int!
  ) {
    allMarkdownRemark(
      filter: {frontmatter: {published: {eq: true}}}
      sort: {
        fields: [frontmatter___postdate],
        order: DESC,
      }
      limit: $limit,
      skip: $skip
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
