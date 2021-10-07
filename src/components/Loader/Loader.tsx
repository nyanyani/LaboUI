import React from "react"
import clsx from "clsx"
import style from "./Loader.module.css"

export interface LoaderProps {}
function Loader(props: LoaderProps) {
  const loaderStyle = clsx(style.loader)
  return <div className={loaderStyle} />
}

export default Loader
