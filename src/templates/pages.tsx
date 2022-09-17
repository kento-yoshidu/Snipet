import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"
import PostList from "../components/PostList"

type Props = {
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
  location: {
    pagepath: string
  }
}

const ArticleList = ({ data, pageContext, location }: Props) => (
  <Layout>
    <Header
      pageTitle="記事一覧"
    />

    <PostList
      postData={data}
    />

  </Layout>
)

export default ArticleList

export const Head =({ data }: { data: Queries.AllArticlesQuery }) => (
  <Seo
    title="記事一覧"
    description="test"
  />
)

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
