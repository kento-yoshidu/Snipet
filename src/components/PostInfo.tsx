import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFolder,
  faClock,
  faRedo,
  faTag,
  faT
} from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const PostInfo = ({ postInfo }) => {
  const [postY, postM, postD] = postInfo.postdate.split("-")
  const [updateY, updateM, updateD] = postInfo.update.split("-")

  return (
    <div className="border ml-[13vw] text-gray-600 max-w-7xl">
      <p className="text-3xl mb-8">
        <FontAwesomeIcon icon={faFolder} className="mr-4"/>

        <Link to={`/series/${postInfo.seriesSlug}/page/1/`}>
          <a className="underline">
            {postInfo.seriesName}
          </a>
        </Link>
      </p>

      <h1 className="mb-8 text-6xl bg-gradient-to-r from-main-color to-sub-color bg-clip-text text-transparent inline-block tracking-widest">{postInfo.title}</h1>

      <ul className="flex gap-8 mb-8 text-2xl">
        <li>
          <FontAwesomeIcon
            className="mr-2"
            icon={faClock}
          />
          {`${postY}年${postM}月${postD}日`}
        </li>
        <li>
          <FontAwesomeIcon
            className="mr-2"
            icon={faRedo}
          />
          {`${updateY}年${updateM}月${updateD}日`}
        </li>
      </ul>

      <ul className="flex mb-8 text-2xl items-center">
        <FontAwesomeIcon
          className="mr-2"
          icon={faTag}
        />
        {postInfo.tags.map((tag) => (
          <li
            className="mr-4"
            key={`tag${tag}`}
          >
            <Link to={`/${tag}/page/1/`}>
              <a className="link">
                # {tag}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <p>{postInfo.description}</p>
    </div>
  )
}

export default PostInfo
