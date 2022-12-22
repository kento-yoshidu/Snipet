import * as React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data }: { data: PageProps<Queries.AllPostsQuery> }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          return (
            <li key={post.node.fields.slug}>
              <header>
                <h2>
                  <Link to={post.node.fields.slug} itemProp="url">
                    {post.node.frontmatter.title}
                  </Link>

                  <time>{post.node.frontmatter.postdate}</time>
                </h2>
              </header>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query AllPosts {
    allMarkdownRemark(sort: {frontmatter: {postdate: DESC}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            postdate(formatString: "YYYY年MM月DD日")
            title
          }
        }
      }
    }
  }
`
