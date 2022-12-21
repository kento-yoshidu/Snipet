import * as React from "react"

import Header from "./header"

const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="pt-32">
      <Header />

      {children}
    </div>
  )
}

export default Layout
