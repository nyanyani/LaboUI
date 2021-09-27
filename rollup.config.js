import { babel } from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import nodeResolve from "@rollup/plugin-node-resolve"
import postcss from "rollup-plugin-postcss"
import nested from "postcss-nested"

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle-cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle-esm.js",
      format: "esm",
    },
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs(),
    babel({
      babelHelpers: "external",
      plugins: ["@babel/plugin-external-helpers"],
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
    }),
    postcss({
      plugins: [nested()],
      modules: true,
    }),
  ],
  external: ["react"],
}
