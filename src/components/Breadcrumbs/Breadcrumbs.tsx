import React from "react"
import clsx from "clsx"

import styles from "./Breadcrumbs.module.css"
import { Icon } from "../Icon"
import arrowIcon from "@/assets/icons/arrow.svg"

export interface IBreadcrumbProps {
  children?: React.ReactElement
  separator?: React.ReactElement
}

const itemSeparator = <Icon iconSrc={arrowIcon.url} selectors="arrow--right" size="xs" color="grey" />
const Breadcrumb = (props: IBreadcrumbProps): React.ReactElement => {
  const { children, separator = itemSeparator } = props
  const navStyle = clsx(styles.breadcrumb__nav)
  const listStyle = clsx(styles.breadcrumb__list)
  const itemStyle = clsx(styles.breadcrumb__item)

  const childArray: React.ReactChild[] = []
  const childCount = React.Children.count(children)
  React.Children.forEach(children, (child, idx) => {
    if (React.isValidElement(child)) {
      childArray.push(
        <li key={idx} className={itemStyle}>
          {child}
          {idx === childCount - 1 ? null : separator}
        </li>
      )
    }
  })

  return (
    <nav className={navStyle}>
      <ul className={listStyle}>{childArray}</ul>
    </nav>
  )
}

export default Breadcrumb
