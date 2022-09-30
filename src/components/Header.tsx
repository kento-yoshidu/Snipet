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
    <header className="mt-48 md:mt-40 mb-12 md:mb-20 text-center">
      <h1 className="text-3xl md:text-5xl">
        {pathname === "/page/1/"
            ? <>{title}</>
            : <Link to="/page/1/">
                <a className="link underline font-light text-gray-700">{title}</a>
              </Link>
        }
      </h1>

      {pageTitle && (
        <h2 className="mt-12 text-5xl md:text-6xl inline-block bg-gradient-to-br from-main-color to-sub-color bg-clip-text text-transparent tracking-widest">{pageTitle}</h2>
      )}
    </header>
  )
}

export default Header
