import * as React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/pageTitle"
import PostList from "../components/postList"

const BlogIndex = ({ data }: PageProps<Queries.AllPostsQuery>) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <PageTitle
        title="記事一覧"
        count={posts.length} 
      />

      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => (
          <PostList
            slug={post!.node!.fields!.slug!}
            title={post!.node!.frontmatter!.title!}
            postdate={post!.node!.frontmatter!.postdate!}
            update={post!.node!.frontmatter!.update!}
            language={post!.node!.frontmatter!.language!}
            tags={post!.node!.frontmatter!.tags!}
            icon={post!.node!.frontmatter!.icon!}
          />
        ))}
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
            title
            postdate(formatString: "YYYY年MM月DD日")
            update(formatString: "YYYY年MM月DD日")
            language
            tags
            icon
          }
        }
      }
    }
  }
`
