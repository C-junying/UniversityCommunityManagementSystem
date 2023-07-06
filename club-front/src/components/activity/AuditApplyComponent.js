import { Form, Input } from 'antd'

export default function AuditApplyComponent(props) {
  const form = props.form
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="apply_id" label="申请编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="activity_id" label="活动编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="area_id" label="场地编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="apply_user" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="reply"
        label="回复内容"
        rules={[
          {
            required: true,
            message: '请输入回复内容!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
    </Form>
  )
}
