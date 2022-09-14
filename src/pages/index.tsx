import React from "react"

import Layout from "../components/layout"
import Header from "../components/Header"
import Seo from "../components/seo"

const BlogIndex = () => (
  <Layout>
    <Header />
  </Layout>
)

export const Head = () => (
  <Seo
    description="説明"
  />
)

export default BlogIndex
