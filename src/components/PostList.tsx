import React from "react"

import { Link } from "gatsby"

const PostList = ({ postData }: { postData: Queries.AllArticlesQuery }) => {
  console.log(postData)

  return (
    <section className="w-1/2 mx-auto">
      {postData.allMarkdownRemark.nodes.map((node) => {
        const [postY, postM, postD] = node?.frontmatter?.postdate?.split("-")
        const [updateY, updateM, updateD] = node?.frontmatter?.update?.split("-")

        return (
          <div
            key={node.id}
            className="border-b"
          >
            <h3 key={node.frontmatter?.title}>
              <Link to={node.fields?.slug}>
                <a className="text-gray-600 text-6xl underline hover:bg-gradient-to-r hover:from-main-color hover:to-sub-color hover:bg-clip-text hover:text-transparent">
                  {node.frontmatter?.title}
                </a>
              </Link>
            </h3>

            <p>{postY}年{postM}月{postD}日</p>
            <p>{updateY}年{updateM}月{updateD}日</p>
            <p>{node.frontmatter?.seriesName}</p>

            <ul>
              {node.frontmatter?.tags?.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </ul>

            <p>{node.frontmatter?.description}</p>

          </div>
        )
      })}
    </section>
  )
}

export default PostList
