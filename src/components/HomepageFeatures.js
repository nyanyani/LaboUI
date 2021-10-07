/* eslint-disable global-require */
import React from "react"
import clsx from "clsx"
import styles from "./HomepageFeatures.module.css"

const FeatureList = [
  {
    title: "简约风格设计",
    Svg: require("../../static/img/undraw_docusaurus_mountain.svg").default,
    description: <>laboUI最初为医院检验科设计，风格简约。</>,
  },
  {
    title: "基于 Typescript 开发",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: <> 静态类型检查，更好的IntelliSense提示。</>,
  },
  {
    title: "使用 React 构建",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        自定义组件可以用来扩展或自定义原有 React 项目布局，使用<code>PostCSS</code>进行样式管理。
      </>
    ),
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
