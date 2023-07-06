import React from 'react'
import { Form, Input, Select } from 'antd'
export default function ActivityMemberConponent(props) {
  const isDisabled = props.isDisabled
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="user_id" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="activity_id" label="活动编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="user_name"
        label="姓名"
        rules={[
          { type: 'string', max: 20, message: '姓名最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入姓名!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入姓名" maxLength={21} disabled={!!isDisabled} />
      </Form.Item>
      <Form.Item
        name="phone"
        label="手机"
        rules={[
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号码格式不对',
            validateTrigger: 'onBlur',
          },
          { required: true, message: '请输入手机号' },
        ]}>
        <Input placeholder="请输入手机号" disabled={!!isDisabled} />
      </Form.Item>
      <Form.Item name="bear_name" label="角色" initialValue="成员">
        <Select
          style={{
            width: 150,
          }}
          options={[
            {
              label: '指导老师',
              value: '指导老师',
            },
            {
              label: '活动负责人',
              value: '活动负责人',
            },
            {
              label: '成员',
              value: '成员',
            },
          ]}
        />
      </Form.Item>
    </Form>
  )
}
