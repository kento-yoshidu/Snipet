import React from "react"
import { Link } from "gatsby"

const Header = () => (
  <header className="w-screen h-[60px] fixed top-0 flex justify-center z-50 bg-white shadow-md">
    <h1 className="leading-[60px] text-sm">
      <Link to="/">
        <a className="text-lg md:text-xl font-bold hover:text-gray-500 underline">
          📚 スニペット置き場
        </a>
      </Link>
    </h1>

    <ul className="absolute md:right-64 h-12 md:h-[60px]">
      <li className="md:text-xl font-bold">
        <Link to="/tags/">
          <a className="hidden md:block md:leading-[60px] hover:text-gray-500 underline">
            🔖 タグ一覧
          </a>
        </Link>
      </li>
    </ul>
  </header>
)

export default Header
