import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Tag = ({ data }: { data: Queries.TagsPageQuery }) => (
  <Layout>
    <>
      <ul>
        {data.allMarkdownRemark.group.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${tag.fieldValue}/page/1/`}>
              {tag.fieldValue}
            </Link>
          </li>
        ))}
      </ul>
    </>
  </Layout>
)

export default Tag

export const pageQuery = graphql`
  query TagsPage($tag: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          published: { eq: true }
          tags: {eq: $tag}
        }
      }
    ) {
      group(field: frontmatter___tags, limit: 1) {
        nodes {
          frontmatter {
            tags
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`


