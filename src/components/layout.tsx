import React from "react"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-24">
      <Header />

      <div
        className="w-11/12 md:w-7/12 py-12 border shadow-md mx-auto"
      >
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
