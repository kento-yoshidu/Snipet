import React from "react"

const PageInfo = ({ currentPage, postCount, pageCount }:
  { currentPage: number, postCount: number, pageCount: number}) => (
  <div className="text-2xl md:text-3xl text-center">
    <p className="mb-6">全 <span className="text-5xl">{postCount}</span> 件の記事</p>
    <p><span className="text-5xl">{pageCount}</span> ページ中 / <span className="text-5xl">{currentPage}</span> ページ目</p>
  </div>
)

export default PageInfo
