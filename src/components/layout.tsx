import React, { ReactNode } from "react"

import Footer from "../components/Footer"

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default Layout
