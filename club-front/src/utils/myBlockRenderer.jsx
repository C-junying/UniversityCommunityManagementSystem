import React, { Component } from 'react'

// 解决富文本编辑器上传图片后，不能输入中文的bug
export const myBlockRenderer = (contentBlock) => {
  const type = contentBlock.getType()

  // 图片类型转换为mediaComponent
  if (type === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        foo: 'bar',
      },
    }
  }
}

class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { block, contentState } = this.props
    const data = contentState.getEntity(block.getEntityAt(0)).getData()
    const emptyHtml = ' '
    return (
      <div>
        {emptyHtml}
        <img src={data.src} alt={data.alt || ''} style={{ height: '100%', width: '100%' }} />
      </div>
    )
  }
}
