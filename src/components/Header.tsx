import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

interface Props {
  pageTitle?: string
  pathname?: string
}

const Header = ({ pageTitle, pathname }: Props) => {
  const { site: { siteMetadata: { title } } } = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `
  )

  return (
    <header className="my-32 text-center">
      <h1 className="text-5xl">
        {pathname === "/page/1/"
            ? <>{title}</>
            : <Link to="/page/1/">
                <a className="underline text-gray-700 hover:text-main-color">{title}</a>
              </Link>
        }
      </h1>

      {pageTitle && (
        <h2>{pageTitle}</h2>
      )}
    </header>
  )
}

export default Header
