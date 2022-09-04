import type { GatsbyNode } from "gatsby"
import path from "path"

import { createFilePath } from "gatsby-source-filesystem"

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  const result = await graphql(
      `
        {
          allArticles: allMarkdownRemark(
            filter: { frontmatter: { published: { eq: true}}}
            sort: { fields: [frontmatter___postdate], order: DESC }
          ) {
            nodes {
              id
              fields {
                slug
              }
            }
          }
        }
      `
  )

  if (result.errors) {
    reporter.panicOnBuild(
        "There was an error loading your blog posts",
        result.errors
    )
    return
  }

  const posts = result?.data?.allMarkdownRemark.nodes

  const blogPost = path.resolve("./src/templates/blog-post.tsx")

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId
        }
      })
    })
  }
}

const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: "slug",
      node,
      value
    })
  }
}

const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}

export { createPages, onCreateNode, createSchemaCustomization }
