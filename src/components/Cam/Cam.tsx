import React, { HTMLAttributes, memo } from "react"

export interface CamProps extends HTMLAttributes<HTMLElement> {
  deviceId?: string | undefined
}

const Cam = () => <input />

export default memo(Cam)
