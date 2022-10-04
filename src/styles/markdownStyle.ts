import { css } from "@emotion/css"
import tw from "twin.macro"

export const Richtext = css`
  h1,
  h2,
  h3 {
    ${tw`pt-8`}
    ${tw`leading-normal`}
  }

  a {
    ${tw`text-main-color`}
    ${tw`hover:underline`}
  }

  a:visited {
    color: #609;
  }

  h1 {
    ${tw`mt-[50px]`}
    ${tw`mb-[30px]`}
    ${tw`pb-[8px]`}
    ${tw`border-b-[7px]`}
    ${tw`border-main-color`}
    ${tw`text-6xl`}
  }

  h2 {
    margin: 50px 0 20px;
    padding: 7px 0 7px 2rem;
    border-left: 9px solid var(--main-color);
    font-size: clamp(2.1rem, 4.1vw, 3.5rem);
  }

  h3 {
    margin: 30px 0 20px;
    font-size: 2.8rem;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
  }

  p {
    ${tw`mb-8`}
    ${tw`text-3xl`}
    ${tw`tracking-wide`}
    ${tw`leading-relaxed`}
    text-indent: 0.8rem
  }

  ol {
    padding: 10px 20px;

    li {
      margin-bottom: 10px;
      font-size: 1.8rem;
      line-height: 1.5;
    }
  }

  ul {
    padding: 10px 20px;
    list-style: none;

    li {
      margin-bottom: 10px;
      font-size: clamp(1.4rem, 1.65vw, 1.8rem);
      line-height: 1.5;
    }
  }

  blockquote {
    position: relative;
    width: 85%;
    padding: 18px 30px 18px 60px;
    margin-top: 12px;
    margin-left: 1rem;
    margin-bottom: 20px;
    background-color: #eee;
    border-radius: 3px;
    box-shadow: 0 0 1.5px 1.5px #ddd;
    color: #666;

    p {
      margin: 0;
      font-size: clamp(1.4rem, 2vw, 1.65rem);
      line-height: 1.6;
    }

    &::before {
      position: absolute;
      top: 50%;
      transform: translateY(-40%);
      content: "❝";
      font-size: 6rem;
      color: #999;
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
    border-radius: 3px;
    box-shadow: 0 0 1.5px 1.5px rgba(#396afc, 0.25);

    p {
      margin: 0;
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
