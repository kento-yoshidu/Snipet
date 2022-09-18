import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"

const Tag = ({ data }: { data: Queries.TagsPageQuery }) => (
  <Layout>
    <Header
      pageTitle="タグ一覧"
    />

    <ul className="w-1/2 mx-auto my-48 flex gap-6">
      {data.allMarkdownRemark.group.map((tag) => (
        <li
          className="border-2 border-gray-600 rounded-md hover:border-main-color py-2 px-4"
          key={tag.fieldValue}
        >
          <Link to={`/tag/${tag.fieldValue}/page/1/`}>
            <a className="text-3xl text-gray-600 hover:text-main-color">
              {tag.fieldValue}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default Tag

export const Head = () => (
  <Seo
    title="タグ一覧"
  />
)

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


