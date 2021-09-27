const path = require("path")
const rootPath = path.resolve(__dirname, "../src")
const iconPath = path.resolve(__dirname, rootPath, "assets/icons/")

const SpriteLoaderPlugin = require("svg-sprite-loader/plugin")

module.exports = {
  stories: ["../src/components/**/*.stories.mdx", "../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-postcss", "@storybook/react"],
  typescript: true,
  webpackFinal: async (config, { configType }) => {
    const cssModules = config.module.rules.find((rule) => rule.test.toString() === "/\\.css$/")
    if (cssModules) {
      cssModules.exclude = /\.module\.css$/
    }

    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: (resourcePath) => {
                if (/pure\.module\.css$/i.test(resourcePath)) {
                  return "pure"
                }
                if (/global\.module\.css$/i.test(resourcePath)) {
                  return "global"
                }
                return "local"
              },
              exportGlobals: true,
              localIdentName: /development/i.test(configType) ? "[path][name]__[local]" : "[hash:base64:5]",
              localIdentContext: rootPath,
            },
          },
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    })

    const svgModule = config.module.rules.find(
      (rule) => rule.test?.toString().includes("svg") && rule?.loader.match(/file-loader/)
    )
    // svgModule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    svgModule.exclude = iconPath

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "svg-sprite-loader",
          options: {
            extract: true,
            spriteFilename: "sprite-[hash:6].svg",
            publicPath: "/public/",
            esModule: false,
          },
        },
        "svgo-loader",
      ],
      include: iconPath,
    })

    config.plugins.push(new SpriteLoaderPlugin())
    config.resolve.alias["@"] = rootPath

    return config
  },
}
