import { Meta } from "@storybook/react"
import React, { useCallback, useState } from "react"
import { CheckboxGroup } from "."
import { Checkbox } from "../Checkbox"

export default {
  title: "Components/Inputs/Checkbox-Group",
  component: CheckboxGroup,
} as Meta

export const Story = () => {
  const [value, setValue] = useState([])
  const handleChange = useCallback((currValue) => {
    setValue(currValue)
  }, [])
  return (
    <CheckboxGroup value={value} onChange={handleChange} label={`selected: ${value.join()}`}>
      <Checkbox label="A" value="A" />
      <Checkbox label="B" value="B" />
      <Checkbox label="C" value="C" />
      <Checkbox label="D" value="D" />
    </CheckboxGroup>
  )
}
