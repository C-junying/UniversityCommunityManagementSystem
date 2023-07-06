import { Form, Input, Select } from 'antd'
export default function AreaUpdate(props) {
  const form = props.form
  const flag = props.flag
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  const selectList = [
    {
      value: 0,
      label: '禁用',
    },
    {
      value: 1,
      label: '未使用',
    },
    {
      value: 2,
      label: '使用中',
    },
  ]
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="area_id" label="场地编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="area_name"
        label="场地名称"
        rules={[
          { type: 'string', max: 20, message: '场地名称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入场地名称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入场地名称" maxLength={21} />
      </Form.Item>
      <Form.Item name="status" label="状态" initialValue={0}>
        <Select
          style={{
            width: 150,
          }}
          onChange={handleChange}
          options={selectList}
        />
      </Form.Item>
      <Form.Item name="regist_time" label="注册时间" hidden={flag}>
        <Input disabled={!flag} />
      </Form.Item>
      <Form.Item name="remark" label="备注">
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
    </Form>
  )
}
