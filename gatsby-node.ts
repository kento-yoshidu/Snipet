import type { GatsbyNode } from "gatsby"
import path from "path"

import { createFilePath } from "gatsby-source-filesystem"
import { faRedditSquare } from "@fortawesome/free-brands-svg-icons"
import { faTag } from "@fortawesome/free-solid-svg-icons"

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
      `
        {
          allArticles: allMarkdownRemark(
            filter: {frontmatter: {published: {eq: true}}}
            sort: {order: DESC, fields: frontmatter___postdate}
          ) {
            nodes {
              id
              fields {
                slug
              }
            }
          }
          allArticlesByGroup: allMarkdownRemark(
            filter: { frontmatter: { published: { eq: true } } }
            sort: { fields: frontmatter___postdate}
          ) {
            group(field: frontmatter___seriesSlug) {
              nodes {
                id
                fields {
                  slug
                }
              }
            }
          }
          # シリーズごとに記事を取得
          articlesBySeries: allMarkdownRemark(
            filter: {frontmatter: {published: {eq: true}}}
            sort: { fields: frontmatter___postdate, order: DESC }
          ) {
            group(field: frontmatter___seriesSlug) {
              fieldValue
              nodes {
                frontmatter {
                  seriesName
                }
              }
            }
          }
          # タグごとに記事を取得
          articlesByTag: allMarkdownRemark(
            filter: {frontmatter: {published: {eq: true}}}
            sort: { fields: frontmatter___postdate, order: DESC }
          ) {
            group(field: frontmatter___tags) {
              fieldValue
              nodes {
                id
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

  // --------------------------------------------------
  // 全ての記事を投稿日時順に表示

  const allArticles = result.data.allArticles

  allArticles.nodes.forEach((_) => {
    const postCount = allArticles.nodes.length
    const pageCount = Math.ceil(postCount / 10)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? "/page/1/" : `/page/${i + 1}/`,
        component: path.resolve("./src/templates/pages.tsx"),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          // totalPageCount: pageCount,
          skip: 10 * i,
          limit: 10,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === pageCount
        }
      })
    })
  })


  result.data.allArticlesByGroup.group.forEach((group) => {
    group.nodes.forEach((node, index) => {
      const previousPostId = index === 0 ? null : group.nodes[index - 1].id
      const nextPostId = index === group.nodes.length - 1 ? null : group.nodes[index + 1].id

      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.tsx"),
        context: {
          id: node.id,
          previousPostId,
          nextPostId
        }
      })
    })
  })

  result.data.articlesBySeries.group.forEach((group) => {
    const seriesSlug = group.fieldValue
    const seriesName = group.nodes[0].frontmatter.seriesName

    const postCount = group.nodes.length
    const pageCount = Math.ceil(postCount / 10)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/series/${seriesSlug}/page/1/` : `/series/${seriesSlug}/page/${i + 1}`,
        component: path.resolve("./src/templates/series.tsx"),
        context: {
          postCount: postCount,
          pageCount: pageCount,
          skip: 10 * i,
          limit: 10,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === pageCount,
          seriesName: seriesName,
          seriesSlug: seriesSlug
        }
      })
    })
  })

  result.data.articlesByTag.group.forEach((group) => {
    const postCount = group.nodes.length
    const pageCount = Math.ceil(postCount / 10)

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/tag/${group.fieldValue}/page/1/` : `/tag/${group.fieldValue}/page/${i + 1}/`,
        component: path.resolve("./src/templates/tag.tsx"),
        context: {
          postCount,
          pageCount,
          skip: i * 10,
          limit: 10,
          currentPage: i + 1,
          isFirst: i === 0,
          isLast: i + 1 === pageCount,
          tag: group.fieldValue
        }
      })
    })
  })
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
