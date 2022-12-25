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

const PostList = ({ slug, title, postdate, update, language, tags, icon }: Props) => {
  return (
    <div className="border-2 rounded-md w-5/6 mx-auto mb-10 py-8 px-14 flex items-center font-bold">
      <p className="mr-10 text-6xl">{icon}</p>

      <div>
        <Link to={slug}>
          <h2 className="mb-3 text-2xl">{title}</h2>
        </Link>

        <div className="mb-3 text-md">
          <time className="mr-8">
            <FontAwesomeIcon icon={faClock} className="mr-2"/>
            {postdate}
          </time>
          <time>
            <FontAwesomeIcon icon={faClock} className="mr-2"/>
            {update}
          </time>
        </div>

        <p className="mb-3">
          <Link to={`/language/${language}/page/1/`}>
            <FontAwesomeIcon icon={faCode} className="mr-2" />
            {language}
          </Link>
        </p>

        <ul className="flex gap-4">
          {tags.map((tag) => (
            <li>
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
