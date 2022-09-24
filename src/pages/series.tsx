import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header"

const Series = ({ data }: { data: Queries.SeriesPageQuery }) => (
  <Layout>
    <Header
      pageTitle="シリーズ一覧"
    />

    <ul className="w-1/2 mx-auto my-48 flex flex-wrap gap-6">
      {data.allMarkdownRemark.group.map((node) => {
        return (
          <li
            className="border-2 border-gray-600 rounded-md hover:border-main-color py-2 px-4"
            key={node.fieldValue}
          >
            <Link to={`/series/${node.fieldValue}/page/1/`}>
              <a className="text-3xl text-gray-600 hover:text-main-color">
                {node.nodes[0].frontmatter.seriesName}({node.totalCount})
              </a>
            </Link>
          </li>
        )})}
    </ul>
  </Layout>
)

export default Series

export const Head = () => (
  <Seo
    title="シリーズ一覧"
  />
)

export const pageQuery = graphql`
  query SeriesPage($seriesSlug: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          published: { eq: true }
          seriesSlug: { eq: $seriesSlug }
        }
      }
    ) {
      group(field: frontmatter___seriesSlug, limit: 1) {
        nodes {
          frontmatter {
            seriesSlug
            seriesName
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`
