import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"

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

      <ul className="mb-8 text-2xl">
        <li>{`${postY}年${postM}月${postD}日`}</li>
        <li>{`${updateY}年${updateM}月${updateD}日`}</li>
      </ul>

      <ul className="mb-8">
        {postInfo.tags.map((tag) => (
          <li key={`tag${tag}`}>{tag}</li>
        ))}
      </ul>

      <p>{postInfo.description}</p>
    </div>
  )
}

export default PostInfo
