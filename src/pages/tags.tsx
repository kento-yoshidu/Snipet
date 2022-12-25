import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/layout"

const Tags = ({ data }: PageProps<Queries.TagsQuery>) => {
  const groups = data.allMarkdownRemark.group

  return (
    <Layout>
      <h1 className="text-4xl text-center">🏷 タグ一覧</h1>

      <ul className="flex flex-wrap gap-8 w-4/5 my-20 mx-auto">
        {groups.map((group) => (
          <li className="border-2 border-neutral-700 rounded py-2 px-4">
            <Link to={`/tag/${group.fieldValue}/page/1/`}>
              <p>{group.fieldValue}({group.totalCount})</p>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query Tags {
    allMarkdownRemark {
      group(field: {frontmatter: {tags: SELECT}}) {
        fieldValue
        totalCount
      }
    }
  }
`
