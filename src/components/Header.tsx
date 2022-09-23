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
    <header className="my-20 md:my-32 text-center">
      <h1 className="text-3xl md:text-5xl mb-16">
        {pathname === "/page/1/"
            ? <>{title}</>
            : <Link to="/page/1/">
                <a className="link underline font-light text-gray-700">{title}</a>
              </Link>
        }
      </h1>

      {pageTitle && (
        <h2 className="text-5xl md:text-6xl inline-block bg-gradient-to-r from-main-color to-sub-color bg-clip-text text-transparent tracking-widest">{pageTitle}</h2>
      )}
    </header>
  )
}

export default Header
