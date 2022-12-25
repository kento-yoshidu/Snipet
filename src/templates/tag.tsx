import React from "react"
import { graphql } from "gatsby"

const Tag = ({ data, pageContext }) => {
  console.log(pageContext)
  console.log("data is", data)

  return (
    <h1>Tag</h1>
  )
}

export default Tag

/*
export const pageQuery = graphql`
  query Tag{
    allMarkdownRemark(
      filter: {frontmatter: {tags: {in: "JavaScript"}}}
    ) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`
*/

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
          postdate(formatString: "YYYY-MM-DD")
          update(formatString: "YYYY-MM-DD")
          title
          tags
          icon
        }
      }
    }
  }
`
