import { Form, Input } from 'antd'
import { useState } from 'react'
import MyUpload from '../other/MyUpload'

export default function ActivityTypeComponent(props) {
  const form = props.form

  // 显示图片地址
  const { imageUrl, setImageUrl } = props
  const [loading, setLoading] = useState(false)
  const imageHandleChange = (info) => {
    if (Array.isArray(info)) {
      return info
    }
    // 上传中
    if (info.file.status === 'uploading') {
      setLoading(true)
    }
    // 上传成功
    if (info.file.status === 'done') {
      setLoading(false)
      // 让图片显示
      setImageUrl(info.file.response.data.img)
      form.setFieldValue('picture', info.file.response.data.img)
    }
    return info && info.fileList
  }
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="type_id" label="类型编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="type_name"
        label="类型名称"
        rules={[
          { type: 'string', max: 20, message: '类型名称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入类型名称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入类型名称" maxLength={21} />
      </Form.Item>
      <Form.Item name="picture" label="背景图" valuePropName="picture">
        <MyUpload
          name="背景图"
          imageUrl={imageUrl}
          loading={loading}
          href="images/uploadType"
          imageHandleChange={imageHandleChange}
        />
      </Form.Item>
      <Form.Item name="type_content" label="类型介绍">
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
    </Form>
  )
}
