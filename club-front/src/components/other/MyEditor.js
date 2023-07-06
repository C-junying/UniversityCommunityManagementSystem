import { useState, useEffect } from 'react'
import { message } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { http } from '@/utils/http'
import { myBlockRenderer } from '../../utils/myBlockRenderer'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.css'

export default function MyEditor(props) {
  // 通知
  const [messageApi, contextHolder] = message.useMessage()
  useEffect(() => {
    // 把传入的数据赋给编辑器
    const html = props.content
    if (html === undefined) return
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [props.content])
  // 编辑器数据
  const [editorState, setEditorState] = useState('')
  // 上传图片
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('file', file)

      http
        .post('/images/uploadText', formData)
        .then((res) => {
          // console.log(res)
          if (res.data.code !== 200) {
            messageApi.error('图片上传失败')
            reject(res)
          } else {
            messageApi.success('图片上传成功')
            resolve({ data: { link: res.data.data.img } })
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  return (
    <>
      {contextHolder}
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        customBlockRenderFunc={myBlockRenderer}
        onBlur={() => {
          // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
          let content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
          content = content.replace(/height: auto;width: auto/g, 'height: 10rem;width: 18rem')

          if (content === '' || content.trim() === '<p></p>') {
            content = ''
            setEditorState('')
          }
          props.getContent(content)
        }}
        toolbar={{
          image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true, // 是否显示排列按钮 相当于text-align
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            inputAccept: 'image/*',
            alt: { present: false, mandatory: false, previewImage: true },
          },
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'embedded',
            'image',
            'remove',
            'history',
          ],
          fontFamily: {
            options: [
              '宋体',
              '黑体',
              '楷体',
              '微软雅黑',
              'Arial',
              'Georgia',
              'Impact',
              'Tahoma',
              'Times New Roman',
              'Verdana',
            ],
          },
        }}
      />
    </>
  )
}
