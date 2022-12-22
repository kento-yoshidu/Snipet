import React from "react"
import { Link } from "gatsby"

type Props = {
  slug: string
  title: string
  postdate: string
  update: string
  icon: string
}

const PostList = ({ slug, title, postdate, update, icon }: Props) => {
  return (
    <div className="border">
      <Link to={slug}>
        <h2 className="underline">{title}</h2>
      </Link>

      <time>{postdate}</time>
      <time>{update}</time>
      <p>{icon}</p>
    </div>
  )
}

export default PostList
