import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as Styles from "../styles/markdown.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faRedo, faTag, faCode } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const BlogPostTemplate = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const [postY, postM, postD] = post!.frontmatter!.postdate!.split("-")
  const [updateY, updateM, updateD] = post!.frontmatter!.update!.split("-")

  return (
    <Layout>
      <div className="w-10/12 mx-auto font-bold">
        <header className="py-10 md:py-8">
          <p className="mb-8 md:mb-12 text-5xl md:text-7xl text-center">{post?.frontmatter?.icon}</p>

          <h1 className="mb-8 md:mb-12 text-xl md:text-4xl text-center">{post?.frontmatter?.title}</h1>

          <div className="text-neutral-700 text-sm md:text-md md:text-lg font-bold tracking-wider">
            <time
              dateTime={post?.frontmatter?.postdate!}
              className="block md:inline md:mr-8"
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faClock}
              />
              {`${postY}年${postM}月${postD}日`}
            </time>

            <time
              dateTime={post?.frontmatter?.update!}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faRedo}
              />
              {`${updateY}年${updateM}月${updateD}日`}
            </time>

            <ul className="flex gap-4 mt-4">
              {post?.frontmatter?.tags?.map((tag) => (
                <li key={`${tag}`}>
                  <Link to={`/tag/${tag}/page/1/`}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faTag}
                    />
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <main
          className={Styles.test}
          dangerouslySetInnerHTML={{ __html: post!.html! }}
          itemProp="articleBody"
        />

        <nav className="mt-20">
          <ul
            className="flex justify-between"
          >
            <li>
              {previous && (
                <Link
                  className="text-xl"
                  to={previous!.fields!.slug!}
                  rel="prev"
                >
                  ← {previous?.frontmatter?.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  className="text-xl"
                  to={next!.fields!.slug!}
                  rel="next"
                >
                  {next?.frontmatter?.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        postdate
        update
        description
        tags
        icon
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
