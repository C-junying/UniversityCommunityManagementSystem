import React, { useState } from 'react'
import { Form, Input, DatePicker } from 'antd'
export default function ActivityStageComponent(props) {
  const [timeStr] = useState('')
  //   处理开始时间与结束时间
  const handleStartEndTime = (date, dateStr) => {
    props.form.setFieldValue('time_string', dateStr.join('+'))
  }
  return (
    <Form form={props.form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item
        name="stage_name"
        label="阶段名称"
        rules={[
          { type: 'string', max: 20, message: '阶段名称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入阶段名称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入阶段名称" maxLength={21} />
      </Form.Item>
      <Form.Item name="time_test" label="时间">
        <DatePicker.RangePicker
          showTime={{
            format: 'HH:mm',
          }}
          onChange={handleStartEndTime}
        />
      </Form.Item>
      <Form.Item name="time_string" hidden initialValue={timeStr}>
        <input />
      </Form.Item>
      <Form.Item
        name="stage_content"
        label="阶段内容"
        rules={[
          {
            required: true,
            message: '请输入该阶段的内容!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input.TextArea showCount allowClear autoSize={{ minRows: 5 }} bordered />
      </Form.Item>
    </Form>
  )
}
