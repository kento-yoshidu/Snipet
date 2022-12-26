import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostList from "../components/postList"

const Tag = ({ data, pageContext }) => {
  const { nodes } = data.allMarkdownRemark

  console.log(nodes)
  return (
    <Layout>
      {nodes.map((node) => (
        <PostList
          slug={node.fields.slug}
          title={node.frontmatter.title}
          postdate={node.frontmatter.postdate}
          update={node.frontmatter.update}
          language={node.frontmatter.language}
          tags={node.frontmatter.tags}
          icon={node.frontmatter.icon}
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
          language
          tags
          icon
        }
      }
    }
  }
`
