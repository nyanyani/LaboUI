/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react"

const whyDidYouRender = require("@welldone-software/why-did-you-render")

whyDidYouRender(React, {
  trackAllPureComponents: true,
})

export default React
