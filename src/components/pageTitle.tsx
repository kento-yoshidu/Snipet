import React from "react"

const PageTitle = ({ title, count }: { title: string, count: number }) => {

  return (
    <div className="mb-8 font-bold text-center">
      <h2 className="mb-4 text-4xl">{title}</h2>

      <p className="text-2xl">{count}件の記事</p>
    </div>
  )
}

export default PageTitle
