import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = () => (
  <Layout>
    <h1>HOME</h1>

    <Link to="/hello-world">Hello World</Link>
  </Layout>
)

export const Head = () => (
  <Seo
    description="説明"
  />
)

export default BlogIndex
