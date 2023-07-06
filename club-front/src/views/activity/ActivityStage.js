import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Form, message, Modal } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { group } from '@/utils/myMethod';
import { useParams } from 'react-router-dom';
import { dateFormat } from '@/utils/time';
import ActivityStageComponent from '@/components/activity/ActivityStageComponent';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
// 活动阶段
function ActivityStage() {
  // store
  const { activityStageStore, activityStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 当前用户
  const [myUser, setMyUser] = useState({});
  // 活动信息
  const [activityInfo, setActivityInfo] = useState({});
  //   获取链接数据
  const params = useParams();
  // 当前用户信息
  useEffect(() => {
    setMyUser(activityStore.userPosition);
  }, [activityStore.userPosition]);
  // 获取当前活动信息
  useEffect(() => {
    setActivityInfo(activityStore.currentActivity);
  }, [activityStore.currentActivity]);
  // 获取数据
  useEffect(() => {
    activityStageStore.getAllActivityStageList(params);
    // .then((res) => {
    //   setDataSource(group(res.data.data, 3))
    // })
  }, [params]);
  // 查看阶段弹出框
  const [lookOpen, setLookOpen] = useState(false);
  const [stageInfo, setStageInfo] = useState({});
  // 添加阶段弹出框
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const addFormOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.activityId = params.activityId;
        if (values.time_string === '') {
          messageApi.error('阶段时间没设置');
          return;
        } else {
          let time = values.time_string.split('+');
          values['start_time'] = time[0];
          values['end_time'] = time[1];
          delete values['time_test'];
        }
        if (
          values['start_time'] < dateFormat(activityInfo['start_time']) ||
          values['start_time'] > dateFormat(activityInfo['end_time'])
        ) {
          messageApi.error('阶段时间的开始时间小于活动的开展时间或大于结束时间');
          return;
        } else if (values['end_time'] > dateFormat(activityInfo['end_time'])) {
          messageApi.error('阶段时间的结束时间大于活动的结束时间');
          return;
        }
        activityStageStore.captainAddActivityStage(values).then((res) => {
          setOpen(false);
          form.resetFields();
          if (res.data.code === 200) {
            messageApi.success(res.data.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            messageApi.error(res.data.msg);
          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 删除阶段
  const confirmMethod = (item) => {
    confirm({
      title: '你确认删除吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteMothed(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // 删除阶段操作
  const deleteMothed = (item) => {
    // console.log(item)
    // 当前页面同步状态+后端同步
    activityStageStore.deleteActivityStage({ stage_id: item, ...params }).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  const onClick = (item) => {
    activityStageStore.getCurrentReport({ stage_id: item }).then((res) => {
      setLookOpen(true);
      setStageInfo(res.data.data[0]);
    });
  };

  return (
    <>
      {contextHolder}
      <div id="user_top" style={{ justifyContent: 'space-between' }}>
        <Button
          type="primary"
          shape="round"
          onClick={() => setOpen(true)}
          hidden={(myUser['bear_name'] === '活动负责人' ? false : true) || activityInfo['activity_state'] === 2}>
          添加阶段
        </Button>
        <div></div>
      </div>
      {group(activityStageStore.activityStageList, 3).map((row, idx) => {
        return (
          <Row gutter={32} key={idx} style={{ marginBottom: 20, marginLeft: 25 }}>
            {row.map((activity) => {
              return (
                <Col span={7} key={activity['stage_id']}>
                  <Card title={activity['stage_name']} style={{ background: '#FAFAFAD0', textAlign: 'center' }}>
                    <p>
                      <b>开始时间：</b>
                      {dateFormat(activity['start_time'])}
                    </p>
                    <p>
                      <b>结束时间：</b>
                      {dateFormat(activity['end_time'])}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button
                        type="primary"
                        size="large"
                        style={{ width: '30%' }}
                        icon={MyIcon('FileSearchOutlined')}
                        onClick={() => onClick(activity['stage_id'])}
                      />
                      <Button
                        hidden={myUser['bear_name'] !== '活动负责人' || activityInfo['activity_state'] === 2}
                        size="large"
                        style={{ width: '30%' }}
                        danger
                        icon={MyIcon('DeleteOutlined')}
                        onClick={() => confirmMethod(activity['stage_id'])}
                      />
                    </div>
                    ,
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
      <Modal
        open={open}
        title="添加阶段"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={() => addFormOk()}>
        <ActivityStageComponent form={form} />
      </Modal>
      <Modal
        open={lookOpen}
        title="查看阶段信息"
        onCancel={() => {
          setLookOpen(false);
          setStageInfo({});
        }}
        footer={null}>
        <p>
          <b style={{ color: 'orange' }}>阶段名称：</b>
          {stageInfo['stage_name']}
        </p>
        <p>
          <b style={{ color: 'orange' }}>阶段内容：</b>
          {stageInfo['stage_content']}
        </p>
      </Modal>
    </>
  );
}
export default observer(ActivityStage);
