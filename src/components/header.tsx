import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header className="w-screen h-[60px] relative md:fixed top-0 flex justify-center z-50 bg-white shadow-md">
    <h1 className="leading-[60px] text-sm">
      <Link to="/">
        <a className="md:text-xl font-bold hover:text-gray-500">
          📚 スニペット置き場
        </a>
      </Link>
    </h1>

    <ul className="absolute md:right-64 h-[60px]">
      <li className="md:text-xl font-bold">
        <Link to="/tags/">
          <a className="leading-[60px] hover:text-gray-500">
            🏷 タグ一覧
          </a>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
