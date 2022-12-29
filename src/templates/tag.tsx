import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/postList"

const Tag = ({ data }: PageProps<Queries.TagQuery>) => {
  const { nodes } = data.allMarkdownRemark

  return (
    <Layout>
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
