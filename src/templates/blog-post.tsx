import * as React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as Styles from "../styles/markdown.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faRedo, faTag, faCode } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const BlogPostTemplate = ({ data }: PageProps<Queries.BlogPostBySlugQuery>) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <div className="w-10/12 mx-auto pb-10 font-bold">
        <main>
          <header className="py-10 md:py-14">
            <p className="mb-8 md:mb-12 text-5xl md:text-7xl text-center">{post?.frontmatter?.icon}</p>
            <h1 className="mb-8 md:mb-12 text-xl md:text-4xl text-center">{post?.frontmatter?.title}</h1>

            <div className="text-neutral-700 text-sm md:text-md md:text-lg font-bold tracking-wider">
              <time className="block md:inline md:mr-8">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faClock}
                />
                {post?.frontmatter?.postdate}
              </time>

              <time>
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faRedo}
                />
                {post?.frontmatter?.update}
              </time>

              <p className="my-1">
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faCode}
                />
                {post?.frontmatter?.language}
              </p>

              <ul className="flex gap-4">
                {post?.frontmatter?.tags?.map((tag) => (
                  <li key={`${tag}`}>
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faTag}
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <section
            className={Styles.test}
            dangerouslySetInnerHTML={{ __html: post!.html! }}
            itemProp="articleBody"
          />
          <hr />
        </main>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            {/*
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
              */}
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
        postdate(formatString: "YYYY年MM月DD日")
        update(formatString: "YYYY年MM月DD日")
        language
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
