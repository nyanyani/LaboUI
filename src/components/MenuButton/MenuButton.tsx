import React from "react"
import { Button, ButtonGroup, ButtonProps } from "../Button"
import { Icon, arrowPreset } from "../Icon"

export interface IMenuButtonProps<T> {
  icon?: string
  label?: string
  menuProps?: T
  handleSelect?(): void
  options: Parameters<typeof arrowPreset>[0]
  children?: React.ReactNode
}

type MenuButtonProps = IMenuButtonProps<ButtonProps<"button">>

const MenuButton = (props: MenuButtonProps): React.ReactElement => {
  const { options = {}, menuProps } = props
  const iconStyle = arrowPreset(options)
  return (
    <ButtonGroup {...menuProps}>
      <Button label="菜单按钮" role-button="group-item" />
      <Button primary>
        <Icon {...iconStyle} />
      </Button>
    </ButtonGroup>
  )
}

export default MenuButton
