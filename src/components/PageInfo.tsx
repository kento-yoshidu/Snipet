import React from "react"

interface Props {
  currentPage: number
  postCount: number
  pageCount: number
}

const PageInfo = ({ currentPage, postCount, pageCount }: Props) => (
  <div className="text-2xl md:text-3xl text-center">
    <p className="mb-6">全 <span className="text-5xl">{postCount}</span> 件の記事</p>
    <p><span className="text-5xl">{pageCount}</span> ページ中 / <span className="text-5xl">{currentPage}</span> ページ目</p>
  </div>
)

export default PageInfo
