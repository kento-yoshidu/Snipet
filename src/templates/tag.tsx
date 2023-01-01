import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/postList"
import PageTitle from "../components/pageTitle"
import Seo from "../components/seo"

type PageContext = {
  postCount: number,
  pageCount: number,
  skip: number,
  limit: number,
  currentPage: number
  isFirst: boolean
  isLast: boolean
  tag: string
}

const Tag = ({ data, pageContext }: { data: Queries.TagQuery, pageContext: PageContext }) => {
  const { tag } = pageContext
  const { nodes } = data.allMarkdownRemark

  return (
    <Layout>
      <PageTitle
        title={`${tag} タグの記事一覧`}
        count={nodes.length}
      />

      {nodes.map((node) => (
        <PostList
          slug={node!.fields!.slug!}
          title={node!.frontmatter!.title!}
          postdate={node!.frontmatter!.postdate!}
          update={node!.frontmatter!.update!}
          tags={node!.frontmatter!.tags!}
          icon={node!.frontmatter!.icon!}
        />
      )) }
    </Layout>
  )
}

export default Tag

export const Head = ({ pageContext }: { pageContext: PageContext }) => {
  return (
    <Seo
      title={`${pageContext.tag} タグの記事一覧`}
    />
  )
}

export const pageQuery = graphql`
  query Tag(
    $tag: String!,
    $limit: Int!,
    $skip: Int!
  ){ allMarkdownRemark(
      sort: {frontmatter: {postdate: DESC}},
      limit: $limit
      skip: $skip
      filter: {
        frontmatter: {
          tags: {in: [$tag]}
        }
      }
    ) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          postdate(formatString: "YYYY-MM-DD")
          update(formatString: "YYYY-MM-DD")
          tags
          icon
        }
      }
    }
  }
`
