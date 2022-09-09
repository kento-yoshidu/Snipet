import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { Link } from "gatsby"

import * as Styles from "../styles/blog-post.scss"

import Seo from "../components/seo"

const BlogPostTemplate = ({ data }: { data: Queries.BlogPostBySlugQuery }) => {
  const { markdownRemark } = data
  const { previous } = data
  const { next } = data


  return (
    <Layout>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <main
          dangerouslySetInnerHTML={{ __html: markdownRemark?.html || "" }}
          itemProp="articleBody"
          className={Styles.blogPost}
        />
      </article>

      {previous && (
        <p><Link to={previous.fields?.slug}>{previous.frontmatter?.title}</Link></p>
      )}
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }: { data: Queries.BlogPostBySlugQuery }) => (
  <Seo
    title={post?.frontmatter?.title || ""}
    description={post?.frontmatter?.description || ""}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        postdate(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        description
        seriesSlug
        seriesName
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
