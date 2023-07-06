import { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
import MyEditor from '@/components/other/MyEditor';
import MyUpload from '@/components/other/MyUpload';
import HeanderTitle from '@/components/other/HeanderTitle';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

function AddClubReport() {
  // store
  const { tokenStore, clubReportStore, clubStore } = useRootStore();
  const [form] = Form.useForm();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  //   获取参数
  const params = useParams();
  // 内容
  const [content, setContent] = useState('');
  // 判断内容是否是第一次加载
  const [flag, setFlag] = useState(true);

  // 显示图片地址
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  // 获取社团信息
  useEffect(() => {
    clubStore.currentClubDesciption(params);
  }, []);
  useEffect(() => {
    if (tokenStore.userInfo && clubStore.currentClub) {
      let intro = {
        club_id: clubStore.currentClub['club_id'],
        club_name: clubStore.currentClub['club_name'],
        user_id: tokenStore.userInfo.userId,
        user_name: tokenStore.userInfo.userName,
      };
      form.setFieldsValue(intro);
    }
  }, [clubStore.currentClub, tokenStore.userInfo, form]);
  useEffect(() => {
    if (flag) {
      setFlag(false);
    } else {
      form.setFieldValue('report_content', content);
      form.validateFields(['report_content']);
    }
  }, [content]);
  // 设置内容
  const getContent = (val) => {
    setContent(val);
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
  const onFinish = (values) => {
    // console.log('Success:', values);
    if (values.picture === '' || values.picture === undefined) {
      messageApi.error('代表图没有上传');
    } else {
      clubReportStore.captainAddClubReport(values).then((res) => {
        if (res.data.code === 200) {
          messageApi.success(res.data.msg);
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        } else {
          messageApi.error(res.data.msg);
        }
      });
    }
  };
  return (
    <>
      {contextHolder}
      <HeanderTitle title="添加学期报告" onBack={() => navigate(-1)} />
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        validateTrigger={['onBlur', 'onChange']}
        onFinish={onFinish}>
        <Form.Item name="club_id" label="社团编号" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="club_name" label="社团名称">
          <Input disabled />
        </Form.Item>
        <Form.Item name="user_id" label="用户编号" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="user_name" label="发起者">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="stage_name"
          label="社团阶段名称"
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
        <Form.Item
          name="report_title"
          label="总结主题"
          rules={[
            { type: 'string', max: 20, message: '主题最多20个字符', validateTrigger: 'onBlur' },
            {
              required: true,
              message: '请输入主题!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input placeholder="请输入主题" maxLength={21} />
        </Form.Item>
        <Form.Item
          name="report_intro"
          label="介绍"
          rules={[
            {
              required: true,
              message: '请输入介绍!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input.TextArea showCount maxLength={130} />
        </Form.Item>
        <Form.Item name="picture" label="代表图" valuePropName="picture">
          <MyUpload
            name="代表图"
            imageUrl={imageUrl}
            loading={loading}
            href="images/uploadClub"
            imageHandleChange={imageHandleChange}
          />
        </Form.Item>
        <Form.Item
          name="report_content"
          label="总结内容"
          rules={[
            {
              required: true,
              message: '请输入总结内容',
              validateTrigger: 'onBlur',
            },
          ]}>
          <MyEditor content={content} getContent={getContent} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default observer(AddClubReport);
