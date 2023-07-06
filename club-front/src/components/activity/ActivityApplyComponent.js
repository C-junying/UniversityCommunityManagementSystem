import { useEffect, useState } from 'react';
import { Form, Input, Select, InputNumber, DatePicker } from 'antd';
import MyEditor from '../other/MyEditor';
import MyUpload from '../other/MyUpload';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

function ActivityApplyComponent(props) {
  const form = props.form;
  const clubId = props.cludId;
  // store
  const { activityTypeStore, teacherStore } = useRootStore();
  // 内容
  const [content, setContent] = useState('');
  // 判断内容是否是第一次加载
  const [flag, setFlag] = useState(true);
  // 显示图片地址
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  //   时间
  const [timeStr] = useState('');

  useEffect(() => {
    // 老师列表
    teacherStore.getAllTeacherList();
    // 类型列表
    activityTypeStore.getAllTypeList();
  }, []);
  useEffect(() => {
    if (flag) {
      setFlag(false);
    } else {
      form.setFieldValue('activity_content', content);
      form.validateFields(['activity_content']);
    }
  }, [content]);
  // 设置内容
  const getContent = (val) => {
    setContent(val);
  };
  // 下拉选择
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  // 上传图片
  const imageHandleChange = (info) => {
    if (Array.isArray(info)) {
      return info;
    }
    // 上传中
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    // 上传成功
    if (info.file.status === 'done') {
      setLoading(false);
      // 让图片显示
      setImageUrl(info.file.response.data.img);
      form.setFieldValue('picture', info.file.response.data.img);
    }
    return info && info.fileList;
  };
  //   处理开始时间与结束时间
  const handleStartEndTime = (date, dateStr) => {
    form.setFieldValue('time_string', dateStr.join('+'));
  };
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item
        name="activity_title"
        label="活动名称"
        rules={[
          { type: 'string', max: 20, message: '活动名称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入活动名称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入活动名称" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="activity_intro"
        label="活动介绍"
        rules={[
          {
            required: true,
            message: '请输入活动的介绍!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input.TextArea showCount maxLength={130} />
      </Form.Item>
      <Form.Item
        name="type_id"
        label="活动类型"
        rules={[
          {
            required: true,
            message: '请选择活动类型!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Select
          style={{
            width: 150,
          }}
          fieldNames={{ label: 'type_name', value: 'type_id' }}
          onChange={handleChange}
          options={activityTypeStore.typeList}
        />
      </Form.Item>
      <Form.Item
        name="teacher_id"
        label="指导老师"
        rules={[
          {
            required: true,
            message: '请选择指导老师!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Select
          style={{
            width: 250,
          }}
          fieldNames={{ label: 'teacher_intro', value: 'teacher_id' }}
          onChange={handleChange}
          options={teacherStore.teacherListIntro}
        />
      </Form.Item>
      <Form.Item name="picture" label="背景图" valuePropName="picture">
        <MyUpload
          name="背景图"
          imageUrl={imageUrl}
          loading={loading}
          href="images/uploadActivity"
          imageHandleChange={imageHandleChange}
        />
      </Form.Item>
      <Form.Item
        name="activity_content"
        label="活动内容"
        rules={[
          {
            required: true,
            message: '请输入活动内容',
            validateTrigger: 'onBlur',
          },
        ]}>
        <MyEditor content={content} getContent={getContent} />
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
        name="activity_look"
        label="面向人群"
        rules={[
          {
            required: true,
            message: '请选择面向人群!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Select
          style={{
            width: 250,
          }}
          options={[
            { label: '本社团', value: clubId },
            { label: '全校', value: '000000' },
          ]}
        />
      </Form.Item>
      <Form.Item name="money" label="使用金额" initialValue={0}>
        <InputNumber min={0} />
      </Form.Item>
    </Form>
  );
}
export default observer(ActivityApplyComponent);
