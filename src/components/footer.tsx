import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

const Footer = () => (
  <footer className="flex justify-center content-center mt-10 py-6 bg-gray-900">
    <a href="https://github.com/kento-yoshidu">
      <FontAwesomeIcon
        className="text-white hover:text-neutral-300 text-5xl"
        icon={faGithub}
      />
    </a>
  </footer>
)

export default Footer
