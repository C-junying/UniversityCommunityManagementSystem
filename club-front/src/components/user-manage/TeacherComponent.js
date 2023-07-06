import { Form, Input, Switch } from 'antd'

export default function TeacherComponent(props) {
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="teacher_id" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="user_id" label="用户编号" hidden>
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
        <Input placeholder="请输入姓名" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        hidden={!!props.isHidden}
        rules={[
          { type: 'string', max: 60, message: '密码最多60个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入密码' },
        ]}>
        <Input.Password placeholder="请输入密码" maxLength={61} />
      </Form.Item>
      <Form.Item label="性别" valuePropName="checked" name="sex">
        <Switch checkedChildren="男" unCheckedChildren="女" />
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
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item
        name="college"
        label="学院"
        rules={[
          { type: 'string', max: 20, message: '学院最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入学院!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入学院" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="position"
        label="职位"
        rules={[
          { type: 'string', max: 20, message: '职位最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入职位!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入职位" maxLength={21} />
      </Form.Item>
    </Form>
  )
}
