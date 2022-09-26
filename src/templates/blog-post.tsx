import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { Link } from "gatsby"

import * as Styles from "../styles/blog-post.module.scss"

import Seo from "../components/seo"
import Header from "../components/Header"
import PostInfo from "../components/PostInfo"

const BlogPostTemplate = ({ data }: { data: Queries.BlogPostBySlugQuery }) => {
  const { markdownRemark } = data
  const { previous } = data
  const { next } = data

  return (
    <Layout>
      <Header />

      <PostInfo
        postInfo={data.markdownRemark?.frontmatter}
      />

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
        <Link to={previous.fields?.slug}>
          <a className="block md:ml-[13vw] w-11/12 md:w-1/2 mx-auto my-4 py-6 px-8 border-2 rounded-md text-gray-600">
            <p className="mb-4 md:mb-8 pb-2 border-dotted border-b-[3px] border-main-color font-bold text-xl md:text-3xl">← 前の記事</p>
            <h3 className="text-2xl md:text-4xl">
              {previous.frontmatter?.title}
            </h3>
          </a>
        </Link>
      )}

      {next && (
        <Link to={next.fields?.slug}>
          <a className="block md:ml-[13vw] w-11/12 md:w-1/2 mx-auto my-4 p-8 border-2 rounded-md text-gray-600">
            <p className="mb-4 pb-2 border-dotted border-b-[3px] border-main-color font-bold text-xl">次の記事 →</p>
            <h3 className="text-2xl">
              {next.frontmatter?.title}
            </h3>
          </a>
        </Link>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data: { markdownRemark: post } }: { data: Queries.BlogPostBySlugQuery }) => (
  <Seo
    title={post?.frontmatter?.title || ""}
    description={post?.frontmatter?.description || ""}
  />
)

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
