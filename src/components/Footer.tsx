import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Footer = () => {
  const { site: { siteMetadata: { title } } } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <footer className="bg-neutral-600 py-16">
      <h1 className="text-center">
        <Link to="/page/1/">
          <a className="text-white text-5xl underline hover:text-main-color">
            {title}
          </a>
        </Link>
      </h1>

      <div>
        <Link
          to={"https://github.com/kento-yoshidu/Gatsby3Blog"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faGithubSquare} />
        </Link>
      </div>

      <div>
        <Link
          to={"/series/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          シリーズ一覧
        </Link>
        <Link
          to={"/tags/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          タグ一覧
        </Link>
      </div>

      <div>
        <Link
          to={"/about/"}
          target="_blink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
          このブログについて
        </Link>
      </div>

      <p>Copyright @ 2022 toriwatari</p>
    </footer>
  )
}

export default Footer
