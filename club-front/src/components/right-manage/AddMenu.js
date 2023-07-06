import React from 'react'
import { Form, Input, Switch, InputNumber } from 'antd'
export default function AddMenu(props) {
  const form = props.form
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="menu_id" label="菜单编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="菜单名"
        rules={[
          { type: 'string', max: 20, message: '菜单名最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入菜单名!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入菜单名" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="href"
        label="菜单路径"
        rules={[
          {
            required: true,
            message: '请输入菜单路径!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入菜单路径" />
      </Form.Item>
      <Form.Item name="parent_id" label="上级菜单" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="sort"
        label="菜单排序"
        initialValue={0}
        rules={[
          { type: 'number', max: 127, min: 0, message: 'max值为127,最小值为0', validateTrigger: 'onBlur' },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="显示" valuePropName="checked" name="is_show">
        <Switch />
      </Form.Item>
      <Form.Item name="menu_logo" label="logo">
        <Input placeholder="请输入菜单logo" />
      </Form.Item>
      <Form.Item name="remarks" label="备注">
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
    </Form>
  )
}
