interface RequireAll<T> {
  (...args: RequireCtx[]): T[]
}
type RequireCtx = __WebpackModuleApi.RequireContext

const requireComponents = require.context("@/assets/icons", false, /\.svg$/)
const requireAll: RequireAll<string> = (requireContext) => requireContext.keys().map(requireContext) as string[]

export default requireAll(requireComponents)
