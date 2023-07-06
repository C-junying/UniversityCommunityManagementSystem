import React from 'react'
import * as Icon from '@ant-design/icons'

export function MyIcon(val, className) {
  const icon = Icon[val]
  if (icon === null || icon === undefined) return null
  if (className === null || className === undefined) return React.createElement(icon)
  else return React.createElement(icon, { className })
}
