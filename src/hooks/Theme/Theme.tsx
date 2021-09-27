export type CSSModule = {
  [className: string]: string
}

export type ColorScheme = "light" | "dark"
export type Scale = "medium" | "large"

export interface Theme {
  global?: CSSModule
  light?: CSSModule
  dark?: CSSModule
  medium?: CSSModule
  large?: CSSModule
}
