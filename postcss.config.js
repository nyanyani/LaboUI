/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require("postcss-mixins"),
    require("postcss-nested"),
    // require("postcss-preset-env"),
    // require("autoprefixer"),
    require("postcss-import")({
      plugins: ["stylelint"],
    }),
    require("postcss-reporter"),
    require("postcss-custom-properties"),
    require("cssnano"),
  ],
}
