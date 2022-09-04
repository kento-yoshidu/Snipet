import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Button = ({ title }: { title: string }) => {
  const a = "str"

  return (
    <button>{title}</button>
  )
}

export default Button
