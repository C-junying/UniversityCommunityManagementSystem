import React, { useState } from 'react';
import { Steps, Button, Form, message, notification } from 'antd';
import HeanderTitle from '@/components/other/HeanderTitle';
import '../index.css';
import ApplyComponent from '@/components/other/ApplyComponent';
import ClubApplyComponent from '@/components/club/ClubApplyComponent';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '@/stores/RootStore';

const items = [
  {
    title: '基本信息',
    description: '申请内容',
  },
  {
    title: '社团内容',
    description: '社团主体内容',
  },
  {
    title: '社团提交',
    description: '提交审核',
  },
];
// 申请社团的相关操作
export default function ClubApply() {
  // store
  const { clubProcessStore } = useRootStore();
  // 跳转
  const navigate = useNavigate();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 控制下一步，上一步
  const [current, setCurrent] = useState(0);
  const [applyForm] = Form.useForm();
  //   申请信息
  const [applyInfo, setApplyInfo] = useState({});
  const [clubContentForm] = Form.useForm();
  // 社团信息
  const [clubInfor, setClubInfor] = useState({});
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
      clubContentForm
        .validateFields()
        .then((res) => {
          if (!!res.picture) {
            setClubInfor(res);
            setCurrent(current + 1);
          } else {
            messageApi.error('社团背景图没上传');
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
    clubProcessStore.applyClub({ applyInfo, clubInfor }).then((res) => {
      if (res.data.code === 200) {
        navigate('/club/club-apply/list');
        notification.info({
          message: `通知`,
          description: `您可以到申请列表中查看您的申请记录`,
        });
        messageApi.success(res.data.msg);
      } else messageApi.error(res.data.msg);
    });
  };
  return (
    <div>
      {contextHolder}
      <HeanderTitle title="申请社团" />
      <Steps current={current} items={items} />
      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : 'active'}>
          <ApplyComponent form={applyForm} />
        </div>
        <div className={current === 1 ? '' : 'active'}>
          <ClubApplyComponent form={clubContentForm} />
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
