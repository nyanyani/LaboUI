declare module "*.css" {
  interface CSSModule {
    [className: string]: string
  }
  const styles: CSSModule
  export default styles
}

declare module "*.svg"
