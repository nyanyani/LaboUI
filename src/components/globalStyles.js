import styled, { css, createGlobalStyle } from "styled-components"

import { flexHelper, flexDirectionHelper, gapHelper, centerHelper, widthHelper } from "./utils/getCssHelper"

const baseColor = "#442257"
const GlobalStyle = createGlobalStyle`
  :root {
    --base-rows: 4;
    --base-cols: 2;
    --base-color: ${baseColor};
    --base-color-green: #3FA049;
    --base-color-orange: #FFA500;
    --base-color-yellow: #F9ED80;
    --base-color-red: #F64C4C;
    --base-color-blue: #436DE0;
    --base-color-black: #000000;
    --base-color-purple: #CC20ff;
  }

  html {
    box-sizing: border-box; 
    font-size: calc(100vw/1920 * 12);
    font-family: "Source Han Sans SC", "Microsoft YaHei", sans-serif;
    color: var(--base-color);
    scroll-behavior: smooth;
  }

  * {
    box-sizing: inherit;
    font-size: inherit;
  }

  body {
    font-size: 1.5rem;
    position: relative;
    margin: 0;
    min-height: 600px;
    height: 100vh;
    overflow: hidden;
    
    &:fullscreen {
      border-radius: 4rem;
    }
  }

  #root {
    background: linear-gradient(135deg, rgba(149, 197, 250, 50), #fff 50%);
    overflow: hidden;
    height: 100vh;
    min-height: 600px;

    @media screen and (max-height: 700px){
      overflow: overlay;
      min-height: 400px;
    }
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    color: inherit;
  }
  
  &::-webkit-scrollbar {
    width: 3rem;
  }

  &::-webkit-scrollbar-thumb {
    border: 1rem solid rgba(0,0,0,0);
    background-clip: padding-box;
    background-color: transparent;
    border-radius: 1.5rem;
  }
  
  @keyframes loading {
    0% {
      width: 0;
    }
    50%, 100% {
      width: .95em;
    }
  }

  @keyframes fading {
    0%, 50% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  @keyframes blink {
    0% {
      opacity: 0.4;
      transform: scale(90%);
    }
    50% {
      opacity: 1;
      transform: scale(100%);
    }
    75% {
      opacity: 0.4;
      transform: scale(95%);
    }
    100% {
      opacity: 1;
      transform: scale(100%);
    }
  }
  @keyframes bounce-in-left {
    0%{
      transform: translateX(-20rem);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    35%{
      transform: translateX(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55%{
      transform: translateX(-2rem);
      animation-timing-function: ease-in;
    }
    70%{
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    80%{
      transform: translateX(-1rem);
      animation-timing-function: ease-in;
    }
    90%{
      -webkit-transform: translateX(0);
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
    95%{
      transform: translateX(-.5rem);
      animation-timing-function: ease-in;
    }
    100%{
      transform: translateX(0);
      animation-timing-function: ease-out;
    }
  }
  @keyframes bounce-in-bottom {
    0%{
      transform: translateY(20rem);
      animation-timing-function: ease-in;
      opacity: 0;
    }
    35%{
      transform: translateY(0);
      animation-timing-function: ease-out;
      opacity: 1;
    }
    55%{
      transform: translateY(2rem);
      animation-timing-function: ease-in;
    }
    70%{
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    80%{
      transform: translateY(1rem);
      animation-timing-function: ease-in;
    }
    90%{
      -webkit-transform: translateY(0);
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
    95%{
      transform: translateY(0.5rem);
      animation-timing-function: ease-in;
    }
    100%{
      transform: translateY(0);
      animation-timing-function: ease-out;
    }
  }

  @property --a {
    initial-value: 60deg;
    inherits: false;
    syntax: '<angle>';
  }
  @property --h {
    initial-value: 0;
    inherits: false;
    syntax: '<number>';
  }
  @property --s {
    initial-value: 100%;
    inherits: false;
    syntax: '<percentage>';
  }
  @property --l {
    initial-value: 50%;
    inherits: false;
    syntax: '<percentage>';
  }

  @keyframes printing {
    0% {
      --a: 60deg;
      --h: 0;
      --s: 100%；
      --l: 50%;
    }
    50% {
      --a: 240deg;
      --h: 135;
      --s: 50%;
      --l: 40%;
    }
    100% {
      --a: 420deg;
      --h: 0;
      --s: 100%;
      --l: 40%;
    }
  }
`

export const Container = styled.div`
  ${widthHelper}
  ${flexHelper}
  ${flexDirectionHelper}
  ${centerHelper}
  ${gapHelper}
`
export const BaseButton = styled.button`
  margin: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  outline: none;
  border: 0;
  background: none;
  color: currentColor;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`
BaseButton.defaultProps = {
  type: "button",
}

const buttonHelper = css(({ hoverable = true, primary, $main, $width, $height }) => {
  const width = $width ?? "3rem"
  const height = $height ?? "3rem"
  const mainColor = $main ? `var(--base-color-${$main})` : "var(--base-color)"
  const background = primary ? mainColor : "transparent"
  const hoverBackground = primary ? "#fff" : mainColor
  const border = `0.25rem solid ${mainColor || ""}`
  const hoverBorderColor = primary ? "currentColor" : mainColor
  const color = primary ? "#fff" : mainColor
  const hoverColor = primary ? mainColor : "#fff"

  return `
    width: ${width};
    height: ${height};
    background: ${background};
    border: ${border};
    color: ${color};

    ${
      hoverable &&
      `&:hover:not(:disabled) {
        transition: all 0.3s ease-in-out;
        background: ${hoverBackground};
        color: ${hoverColor};
        border-color: ${hoverBorderColor};
      }`
    }
  `
})

export const Button = styled(BaseButton)`
  font-size: inherit;
  font-weight: 400;
  text-align: center;
  border-radius: 0.8rem;

  ${buttonHelper}
  @media screen and (max-width: 1000px) {
    min-height: 20px;
  }
`

Button.defaultProps = {
  $width: "100%",
  $height: "100%",
  $fontSize: "3rem",
}

export const Header = styled.header`
  display: flex;
  --header-height: 3rem;
  height: var(--header-height);
  gap: 5rem;
  flex-direction: row;
  font-size: 1.5rem;

  & > :first-child {
    margin-right: auto;
  }

  img {
    height: 100%;
  }

  span {
    display: inline-block;
    line-height: var(--header-height);
  }
`
export const Footer = styled.footer`
  display: flex;
`
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
export const CamImg = styled(Img)`
  cursor: pointer;
`
export const Ul = styled.ul`
  text-decoration: none;
  margin: 0;
  padding: 0;
`

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  white-space: nowrap;
`

export const Loading = styled(Center)`
  left: calc(50% - 1.5rem);

  &::after {
    content: "...";
    display: inline-block;
    position: absolute;
    overflow: hidden;
    opacity: 1;
    animation: loading 2s linear infinite, fading 2s linear infinite;
  }
`

export const Icon = styled.svg`
  width: 3rem;
  height: 3rem;
`

export const Arrow = styled(BaseButton)`
  opacity: 0.3;
  font-size: 0;
  transition: 0.3s ease opacity;

  &:hover {
    opacity: 1;
    animation: none;
  }
  svg {
    width: 3rem;
    height: 3rem;
  }
`
Arrow.defaultProps = {
  children: (
    <svg>
      <use xlinkHref="#arrow" />
    </svg>
  ),
}
export const ToolTips = css(({ tipAttr = "data-tip", $direction = "bottom", customBefore, customAfter }) => {
  const baseStyle = (before = "", after = "") => `
  &:hover {
    &::before {
      content: attr(${tipAttr});
      position: absolute;
      background: var(--base-color);
      border-radius: 1rem;
      font-size: 2rem;
      color: #fff;
      padding: 1.5rem;
      white-space: nowrap;
      box-shadow: 0 4px 20px 0 #8e8e8e;
      ${before}
    }
    &::after {
      content: "";
      position: absolute;
      border: 1rem solid;
      ${after}
    }
  `
  if ($direction === "left") {
    return baseStyle(
      `top: 50%;
      right: calc(100% + 1.5rem);
      transform: translateY(-50%);
      `,
      `top: 50%;
      left: -1.5rem;
      border-color: transparent transparent transparent currentColor;
      transform: translateY(-50%);
    `
    )
  }
  if ($direction === "bottom") {
    return baseStyle(
      `top: 100%;
      left: 50%;
      transform: translate(-50%, 2rem);
      `,
      `top: 100%;
      left: 50%;
      border-color: transparent transparent currentColor;
      transform: translateX(-50%);
      `
    )
  }
  if ($direction === "custom") {
    return baseStyle(customBefore, customAfter)
  }
})

export default GlobalStyle
