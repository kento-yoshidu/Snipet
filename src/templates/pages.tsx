import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"
import PageInfo from "../components/PageInfo"
import PostList from "../components/PostList"
import { PageContext } from "../@types/types"

type Props = {
  data: Queries.AllArticlesQuery
  pageContext: PageContext
}

const ArticleList = ({ data, pageContext }: Props) => (
  <Layout>
    <Header
      pageTitle="記事一覧"
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

export default ArticleList

export const Head =() => (
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
