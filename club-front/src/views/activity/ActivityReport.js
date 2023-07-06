import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, message, Modal, Button, Descriptions } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import MyEditor from '@/components/other/MyEditor';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

// 活动总结
function ActivityReport() {
  // store
  const { activityStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();

  //   获取链接数据
  const params = useParams();
  // 当前用户
  const [myUser, setMyUser] = useState({});
  // 活动信息
  const [activityInfo, setActivityInfo] = useState({});
  // 当前用户信息
  useEffect(() => {
    setMyUser(activityStore.userPosition);
  }, [activityStore.userPosition]);
  // 获取当前活动信息
  useEffect(() => {
    setActivityInfo(activityStore.currentActivity);
  }, [activityStore.currentActivity]);
  // 表单
  const [form] = Form.useForm();
  // 总结内容
  const [content, setContent] = useState('');
  useEffect(() => {
    if (activityInfo['activity_state'] === 2) {
      setContent(activityInfo['activity_report']);
    }
  }, [activityInfo]);
  useEffect(() => {
    form.setFieldValue('activity_report', content);
    form.validateFields(['activity_report']);
  }, [content, form]);
  // 设置内容
  const getContent = (val) => {
    setContent(val);
  };
  // 提交活动总结
  const submitActivityReport = () => {
    form.validateFields().then((values) => {
      values['activity_id'] = params.activityId;
      activityStore.activityReport(values).then((res) => {
        if (res.data.code === 200) {
          messageApi.success(res.data.msg);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          messageApi.error(res.data.msg);
        }
      });
    });
  };
  // 撤回活动总结
  const alterAcitivityReport = () => {
    Modal.confirm({
      title: '你确认撤回活动报告吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      okText: '撤回',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        activityStore.cancleActivityReport(params).then((res) => {
          if (res.data.code === 200) {
            messageApi.success(res.data.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            messageApi.error(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        validateTrigger={['onBlur', 'onChange']}
        style={{ display: activityInfo['activity_state'] === 1 ? 'block' : 'none' }}>
        <Form.Item
          name="activity_report"
          rules={[
            {
              required: true,
              message: '请输入活动内容',
              validateTrigger: 'onBlur',
            },
          ]}>
          <MyEditor content={content} getContent={getContent} />
        </Form.Item>
      </Form>
      <Descriptions
        size="middle"
        style={{
          display: activityInfo['activity_state'] === 1 ? 'none' : 'block',
        }}>
        <Descriptions.Item label="活动总结">
          {
            <div
              dangerouslySetInnerHTML={{
                __html: activityInfo['activity_report'],
              }}
              style={{
                margin: '0 24px',
              }}></div>
          }
        </Descriptions.Item>
      </Descriptions>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button
          size="large"
          type="primary"
          hidden={(myUser['bear_name'] === '活动负责人' ? false : true) || activityInfo['activity_state'] === 2}
          onClick={submitActivityReport}>
          提交
        </Button>
        <Button
          size="large"
          type="primary"
          danger
          hidden={(myUser['bear_name'] === '活动负责人' ? false : true) || activityInfo['activity_state'] === 1}
          onClick={alterAcitivityReport}>
          撤回
        </Button>
      </div>
    </>
  );
}
export default observer(ActivityReport);
