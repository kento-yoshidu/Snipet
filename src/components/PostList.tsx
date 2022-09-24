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
    <section className="w-5/6 md:w-1/2 mx-auto py-12">
      {postData.allMarkdownRemark.nodes.map((node) => {
        const [postY, postM, postD] = node?.frontmatter?.postdate?.split("-")
        const [updateY, updateM, updateD] = node?.frontmatter?.update?.split("-")

        return (
          <div
            key={node.id}
            className="border-t border-gray-400 py-12 px-16 text-gray-700 tracking-wider"
          >
            <h3 key={node.frontmatter?.title}>
              <Link to={node.fields?.slug}>
                <a className="mb-8 link text-3xl md:text-5xl underline leading-loose">
                  {node.frontmatter?.title}
                </a>
              </Link>
            </h3>

            <ul className="flex gap-4 mb-6 text-3xl tracking-wide">
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

            <p className="mb-6 text-3xl">
              <FontAwesomeIcon
                className="mr-2"
                icon={faFolder}
              />
              <Link to={`/series/${node.frontmatter?.seriesSlug}/page/1/`}>
                <a className="link">
                  {node.frontmatter?.seriesName}
                </a>
              </Link>
            </p>

            <ul className="flex items-center gap-2 mb-6 text-3xl">
              <FontAwesomeIcon
                className="mr-2"
                icon={faTag}
              />
              {node.frontmatter?.tags?.map((tag) => (
                <li key={tag}>
                  <Link to={`/tag/${tag}/page/1/`}>
                    <a className="link">
                      # {tag}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="text-3xl">
              <FontAwesomeIcon
                className="mr-2"
                icon={faComment}
              />
              {node.frontmatter?.description}
            </p>
          </div>
        )
      })}
    </section>
  )
}

export default PostList
