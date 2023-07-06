import React from 'react'
import { Form, Input, InputNumber } from 'antd'
export default function AddRole(props) {
  const form = props.form
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="role_id" label="角色编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="role_name"
        label="角色名称"
        rules={[
          { type: 'string', max: 20, message: '角色名称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入角色名称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入角色名称" maxLength={21} />
      </Form.Item>
      <Form.Item name="role_logo" label="logo">
        <Input placeholder="请输入角色logo" />
      </Form.Item>
      <Form.Item name="rank" label="级别" initialValue={0}>
        <InputNumber min={0} max={100000} />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
    </Form>
  )
}
