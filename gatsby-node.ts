import path from "path"
import { createFilePath } from "gatsby-source-filesystem"

import { GatsbyNode } from "gatsby"

const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions

  const allArticles = await graphql(`
    query AllArticles {
      allMarkdownRemark(
        sort: { frontmatter: { date: ASC } },
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  allArticles.data.allMarkdownRemark.nodes.map((node, index) => {
    const { nodes } = allArticles.data.allMarkdownRemark

    const previousPostId = index === 0 ? null : nodes[index - 1].id
    const nextPostId = index === nodes.length - 1 ? null : nodes[index + 1].id

    createPage({
      path: node.fields.slug,
      component: blogPost,
      context: {
        id: node.id,
        previousPostId,
        nextPostId
      }
    })
  })

  const artcilesByTag = await graphql(`
    query articlesByTag{
      allMarkdownRemark {
        group(field: {frontmatter: {tags: SELECT}}) {
          fieldValue
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `)

  artcilesByTag.data.allMarkdownRemark.group.map((tag) => {
    const postCount = tag.edges.length
    const pageCount = Math.ceil(postCount / 10)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tag/${tag.fieldValue}/page/1/` : `/tag/${tag.fieldValue}/page/${i + 1}}`,
        component: path.resolve("./src/templates/tag.tsx"),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          skip: 10 * i,
          limit: 10,
          currentPage: i + 1,
          isFirst: i === 0,
          isLast: i + 1 === pageCount,
          tag: tag.fieldValue
        }
      })
    })
  })
}

const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
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
