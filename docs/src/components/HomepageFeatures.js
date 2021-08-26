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
    title: "语义化结构",
    Svg: require("../../static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        基于Adobe的<code>react-aria</code>库，更加符合语义化。
      </>
    ),
  },
  {
    title: "使用 React 构建",
    Svg: require("../../static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        自定义组件可以用来扩展或自定义原有 React 项目布局，基于<code>styled-component</code>库进行样式管理。
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
