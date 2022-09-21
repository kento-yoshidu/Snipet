import React from "react"
import { Link } from "gatsby"

const PostInfo = ({ postInfo }) => {
  const [postY, postM, postD] = postInfo.postdate.split("-")
  const [updateY, updateM, updateD] = postInfo.update.split("-")

  return (
    <>
      <p>
        <Link to={`/series/${postInfo.seriesSlug}/page/1/`}>
          {postInfo.seriesName}
        </Link>
      </p>

      <h2>{postInfo.title}</h2>

      <ul>
        <li>{`${postY}年${postM}月${postD}日`}</li>
        <li>{`${updateY}年${updateM}月${updateD}日`}</li>
      </ul>

      <ul>
        {postInfo.tags.map((tag) => (
          <li key={`tag${tag}`}>{tag}</li>
        ))}
      </ul>

      <p>{postInfo.description}</p>
    </>
  )
}

export default PostInfo
