import React, { useState } from 'react';
import { Steps, Button, Form, message, notification } from 'antd';
import '../index.css';
import ApplyComponent from '@/components/other/ApplyComponent';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityApplyComponent from '@/components/activity/ActivityApplyComponent';
import { useRootStore } from '@/stores/RootStore';

const items = [
  {
    title: '基本信息',
    description: '申请内容',
  },
  {
    title: '活动内容',
    description: '活动主体内容',
  },
  {
    title: '活动提交',
    description: '提交审核',
  },
];
// 申请社团的相关操作
export default function ApplyActivity() {
  // store
  const { activityProcessStore } = useRootStore();
  // 跳转
  const navigate = useNavigate();
  // 链接数据
  const params = useParams();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 控制下一步，上一步
  const [current, setCurrent] = useState(0);
  const [applyForm] = Form.useForm();
  //   申请信息
  const [applyInfo, setApplyInfo] = useState({});
  const [activityContentForm] = Form.useForm();
  // 活动信息
  const [activityInfor, setActivityInfor] = useState({});
  const handleNext = () => {
    if (current === 0) {
      applyForm
        .validateFields()
        .then((res) => {
          setApplyInfo(res);
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      activityContentForm
        .validateFields()
        .then((res) => {
          if (res.time_string === '') {
            messageApi.error('活动时间没设置');
            return;
          } else {
            let time = res.time_string.split('+');
            res['start_time'] = time[0];
            res['end_time'] = time[1];
            delete res['time_test'];
          }
          if (!!res.picture) {
            setActivityInfor(res);
            setCurrent(current + 1);
          } else {
            messageApi.error('活动背景图没上传');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // 上一页
  const handlePrevious = () => {
    setCurrent(current - 1);
  };
  // 提交
  const handleSave = (auditState) => {
    applyInfo['apply_state'] = auditState;
    activityInfor.clubId = params.clubId;
    activityProcessStore.applyActivity({ applyInfo, activityInfor }).then((res) => {
      if (res.data.code === 200) {
        notification.info({
          message: `通知`,
          description: `您可以到申请列表中查看您的申请记录`,
        });
        navigate(`/club/my-club/${params.clubId}/intro/apply-activity-list`);
      } else messageApi.error(res.data.msg);
    });
  };
  return (
    <div>
      {contextHolder}
      <Steps current={current} items={items} />
      <div style={{ marginTop: '10px' }}>
        <div className={current === 0 ? '' : 'active'}>
          <ApplyComponent form={applyForm} />
        </div>
        <div className={current === 1 ? '' : 'active'}>
          <ActivityApplyComponent form={activityContentForm} cludId={params.clubId} />
        </div>
      </div>
      {/* 下一步 上一步 保存 提交 */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        {current === 2 && (
          <span>
            <Button danger onClick={() => handleSave(0)}>
              提交审核
            </Button>
          </span>
        )}
        {current < 2 && (
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        )}
        {current > 0 && <Button onClick={handlePrevious}>上一步</Button>}
      </div>
    </div>
  );
}
