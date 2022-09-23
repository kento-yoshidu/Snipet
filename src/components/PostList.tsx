import React from "react"

import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFolder,
  faClock,
  faRedo,
  faTag,
  faComment
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const PostList = ({ postData }: { postData: Queries.AllArticlesQuery }) => {
  return (
    <section className="w-5/6 md:w-1/2 mx-auto">
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
                <a className="mb-4 link text-gray-600 text-3xl md:text-6xl underline">
                  {node.frontmatter?.title}
                </a>
              </Link>
            </h3>

            <ul className="flex gap-4 mb-4 text-2xl tracking-wide">
              <li>
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faClock}
                />
                {postY}年{postM}月{postD}日
              </li>

              <li>
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faRedo}
                />
                {updateY}年{updateM}月{updateD}日
              </li>
            </ul>

            <p className="mb-4 text-2xl">
              <FontAwesomeIcon
                className="mr-2"
                icon={faFolder}
              />
              {node.frontmatter?.seriesName}</p>

            <ul className="flex gap-2 mb-4 text-2xl">
              <FontAwesomeIcon
                className="mr-2"
                icon={faTag}
              />
              {node.frontmatter?.tags?.map((tag) => (
                <li key={tag}># {tag}</li>
              ))}
            </ul>

            <p className="text-2xl">
              {node.frontmatter?.description}
            </p>
          </div>
        )
      })}
    </section>
  )
}

export default PostList
