import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const BlogIndex = () => (
  <Layout>
    <h1>HOME</h1>

    <Link to="/hello-world">Hello World</Link>
  </Layout>
)

export default BlogIndex
