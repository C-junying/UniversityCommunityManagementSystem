import React from 'react'
import './index.css'
import { MyIcon } from '@/utils/MyIcon'
export default function HeanderTitle(props) {
  const title = props.title
  const onBack = props.onBack

  const subTitle = props.subTitle
  return (
    <div className="header-title">
      {onBack && (
        <div
          className="left"
          onClick={() => {
            onBack()
          }}>
          {MyIcon('ArrowLeftOutlined')}
        </div>
      )}
      <div className="title">{title}</div>
      <div className="sub-title" hidden={!subTitle}>
        {subTitle}
      </div>
    </div>
  )
}
