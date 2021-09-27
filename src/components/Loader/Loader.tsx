import React from "react"
import clsx from "clsx"
import style from "./Loader.module.css"

function Loader() {
  const loaderStyle = clsx(style.loader)
  return <div className={loaderStyle} />
}

export default Loader
