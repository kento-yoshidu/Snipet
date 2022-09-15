import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"

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

    {data.allMarkdownRemark.nodes.map((node) => {
      const [postY, postM, postD] = node?.frontmatter?.postdate?.split("-")
      const [updateY, updateM, updateD] = node?.frontmatter?.update?.split("-")

      return (
        <div
          key={node.id}
          className="py-10">
          <p>{postY}年{postM}月{postD}日</p>
          <p>{updateY}年{updateM}月{updateD}日</p>
          <p>{node.frontmatter?.seriesName}</p>

          <ul>
            {node.frontmatter?.tags?.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </ul>

          <p key={node.frontmatter?.title}>
            <Link to={node.fields?.slug}>{node.frontmatter?.title}</Link>
          </p>

          <p>{node.frontmatter?.description}</p>

        </div>
      )})}
  </Layout>
)

export default ArticleList

export const Head =({ data }: { data: Queries.AllArticlesQuery }) => {
  <Seo
    title="test"
    description="test"
  />
}

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
