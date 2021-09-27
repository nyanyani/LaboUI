import React from "react"

import { Meta, Story } from "@storybook/react"

import Layout from "./Layout"

export default {
  title: "Components/Layout",
  component: Layout,
} as Meta

type LayoutProps = {
  type?: string
}

const Template: Story<LayoutProps> = (args) => <Layout {...args} />
export const Primary = Template.bind({})
Primary.args = {}
