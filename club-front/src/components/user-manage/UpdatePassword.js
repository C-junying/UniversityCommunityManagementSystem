import React from 'react'
import { Form, Input } from 'antd'

export default function UpdatePassword(props) {
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="user_id" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="新密码"
        rules={[
          { type: 'string', max: 60, message: '密码最多60个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入密码' },
        ]}>
        <Input.Password placeholder="请输入新密码" maxLength={61} />
      </Form.Item>
    </Form>
  )
}
