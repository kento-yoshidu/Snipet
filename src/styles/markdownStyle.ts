import { css } from "@emotion/css"
import tw from "twin.macro"

export const Richtext = css`
  h1,
  h2,
  h3 {
    ${tw`leading-normal`}
  }

  a {
    ${tw`text-main-color`}
    ${tw`hover:underline`}
  }

  a:visited {
    ${tw`text-[#660099]`}
  }

  h1 {
    ${tw`mt-[50px]`}
    ${tw`mb-[30px]`}
    ${tw`pb-[8px]`}
    ${tw`border-b-[7px]`}
    ${tw`border-main-color`}
    ${tw`text-4xl`}
    ${tw`md:text-6xl`}
  }

  h2 {
    ${tw`mt-[50px]`}
    ${tw`mb-[20px]`}
    ${tw`border-l-[9px]`}
    ${tw`border-main-color`}
    ${tw`text-3xl`}
    ${tw`md:text-5xl`}
  }

  h3 {
    ${tw`mt-[30px]`}
    ${tw`mb-[20px]`}
    ${tw`text-3xl`}
    ${tw`md:text-5xl`}
  }

  p {
    ${tw`mb-6`}
    ${tw`md:mb-8`}
    ${tw`text-2xl`}
    ${tw`md:text-[1.65rem]`}
    ${tw`tracking-wide`}
    ${tw`md:leading-[1.7]`}
    text-indent: 0.8rem
  }

  ol {
    ${tw`py-[10px]`}
    ${tw`px-[20px]`}

    li {
      ${tw`mb-[10px]`}
      ${tw`text-2xl`}
      ${tw`md:text-3xl`}
      ${tw`leading-normal`}
    }
  }

  ul {
    ${tw`py-6`}
    ${tw`py-8`}
    ${tw`list-none`}

    li {
      ${tw`mb-[10px]`}
      ${tw`text-2xl`}
      ${tw`md:text-3xl`}
      ${tw`leading-normal`}
    }
  }

  blockquote {
    ${tw`relative`}
    ${tw`w-11/12`} 
    ${tw`md:w-5/6`} 
    ${tw`py-[18px]`}
    ${tw`pr-[30px]`}
    ${tw`pl-28`}
    ${tw`mt-12`}
    ${tw`ml-2`}
    ${tw`mb-12`}
    ${tw`bg-gray-200`}
    ${tw`rounded-lg`}
    ${tw`shadow-lg`}
    ${tw`text-gray-600`}

    p {
      ${tw`m-0`}
      ${tw`text-[1.5rem]`}
      ${tw`leading-relaxed`}
    }

    &::before {
      ${tw`hidden`}
      ${tw`md:block`}
      ${tw`absolute`}
      ${tw`top-1/2`}
      transform: translateY(-40%);
      ${tw`content-['❝']`}
      ${tw`text-8xl`}
      ${tw`text-gray-400`}
      margin-left: -50px;
    }
  }

  table {
    margin: 40px 0;

    tr {
      th {
        border: 1px solid #bbb;
        padding: 10px 15px;
        background: var(--main-color);
        color: #fff;
        font-size: clamp(1.5rem, 1.7vw, 1.7rem);
        font-weight: 400;
        line-height: 1.3;
        vertical-align: middle;
      }

      td {
        padding: 10px 20px;
        border: 1px solid #bbb;
        font-size: clamp(1.4rem, 1.6vw, 1.7rem);
        line-height: 1.3;
      }
    }
  }

  aside {
    position: relative;
    width: 85%;
    margin-bottom: 20px;
    padding: 18px 20px 18px 60px;
    background-color: rgba(#396afc, 0.15);
    ${tw`bg-red-900`}
    border-radius: 3px;
    box-shadow: 0 0 1.5px 1.5px rgba(#396afc, 0.25);

    p {
      ${tw`m-0`}
      font-size: clamp(1.55rem, 2.5vw, 1.7rem);
      line-height: 1.6;
    }

    &::before {
      position: absolute;
      content: "💡";
      top: 50%;
      transform: translateY(-50%);
      height: 3.5rem;
      width: 3.5rem;
      margin-left: -50px;
      background-color: rgba(#396afc, 0.3);
      border-radius: 100%;
      font-size: 2rem;
      line-height: 1.6;
      text-align: center;
      z-index: 1;
    }
  }

  details {
    width: 90%;
    margin: 20px 0 0;
    padding: 15px 0 15px 25px;
    border-radius: 5px;
    box-shadow: 0 0 2px 3px #eee;
    font-size: 1.6rem;

    summary {
      cursor: pointer;
    }

    &[open] {
      padding: 15px 0 5px 25px;
    }

    &[open] summary {
      margin-bottom: 15px;
    }
  }
`
