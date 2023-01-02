import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faRedo, faTag, faCode, faLanguage } from "@fortawesome/free-solid-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

type Props = {
  slug: string
  title: string
  postdate: string
  update: string
  language: string
  tags: string[]
  icon: string
}

const PostList = ({ slug, title, postdate, update, tags, icon }: Props) => {
  const [postY, postM, postD] = postdate.split("-")
  const [updateY, updateM, updateD] = update.split("-")

  return (
    <div className="border-2 rounded-md w-5/6 mx-auto mb-10 py-8 px-14 flex items-center font-bold">
      <p className="mr-10 text-6xl">{icon}</p>

      <div>
        <Link to={slug}>
          <h2 className="mb-3 text-2xl">{title}</h2>
        </Link>

        <div className="mb-3 text-md">
          <time
            dateTime={postdate}
            className="mr-8"
          >
            <FontAwesomeIcon icon={faClock} className="mr-2"/>
            {`${postY}年${postM}月${postD}日`}
          </time>
          <time
            dateTime={update}
          >
            <FontAwesomeIcon icon={faClock} className="mr-2"/>
            {`${updateY}年${updateM}月${updateD}日`}
          </time>
        </div>

        <ul className="flex gap-4">
          {tags.map((tag) => (
            <li key={tag}>
              <Link to={`/tag/${tag}/page/1/`}>
                <FontAwesomeIcon icon={faTag} className="mr-2" />
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostList
