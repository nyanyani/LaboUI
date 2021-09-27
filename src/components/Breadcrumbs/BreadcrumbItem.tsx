import React from "react"
import clsx from "clsx"
import { getWrappedElement } from "@/utils/getWrappedElement"
import { Icon } from "../Icon"
import styles from "./Breadcrumbs.module.css"
import arrowIcon from "@/assets/icons/arrow.svg"

export interface IBreadcrumbItemProps {
  isCurrent?: boolean
  isDisabled?: boolean
  onPress?(): void
  children?: React.ReactNode
}

const BreadcrumbItem = (props: IBreadcrumbItemProps): React.ReactElement => {
  const { isCurrent, isDisabled, children } = props
  const element = React.cloneElement(getWrappedElement(children), {
    ...props,
    className: clsx(!isCurrent && isDisabled && styles["breadcrumb--disabled"], styles.breadcrumb__itemLink),
  })

  return <>{isCurrent ? <Icon iconSrc={arrowIcon.url} selectors="arrow--down" size="xs" /> : null}</>
}

export default BreadcrumbItem
