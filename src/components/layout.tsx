import * as React from "react"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="pt-32">
      <Header />

        {children}

      <Footer />
    </div>
  )
}

export default Layout
