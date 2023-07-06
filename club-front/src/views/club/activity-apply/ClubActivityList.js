import React, { useEffect } from 'react';
import { Card, Col, Row, Avatar, Tag } from 'antd';
import { group } from '@/utils/myMethod';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
// 社团活动列表
function ClubActivityList() {
  // store
  const { activityStore } = useRootStore();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    activityStore.getClubActivityList(params);
  }, [params]);
  const onClick = (item) => {
    navigate(`/activity/list/${item}/intro`);
  };
  return (
    <>
      {group(activityStore.clubActivityList, 3).map((row, idx) => {
        return (
          <Row gutter={32} key={idx} style={{ marginBottom: 20, marginLeft: 25 }}>
            {row.map((activity) => {
              return (
                <Col span={6} key={activity['activity_id']} onClick={() => onClick(activity['activity_id'])}>
                  <Card
                    hoverable
                    style={{ background: '#FAFAFAD0' }}
                    cover={<img alt="example" src={activity['picture']} style={{ maxHeight: 150 }} />}>
                    <div>
                      <div
                        style={{
                          overflow: 'hidden',
                          color: 'rgba(0, 0, 0, 0.88)',
                          fontWeight: 600,
                          fontSize: '16px',
                        }}>
                        <div style={{ float: 'left' }}>
                          <Avatar src={activity['type_picture']} alt="avatar" /> {activity['activity_title']}
                        </div>
                        <div style={{ float: 'right', fontWeight: 400 }}>
                          {activity['activity_state'] === 1 ? (
                            <Tag color="success">正在进行中</Tag>
                          ) : (
                            <Tag color="default">已结束</Tag>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: '10px',
                          fontSize: '14px',
                          lineHeight: '22px',
                          color: 'rgba(0, 0, 0, 0.45)',
                        }}>
                        {activity['activity_intro'].length > 25
                          ? activity['activity_intro'].slice(0, 22) + '...'
                          : activity['activity_intro']}
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
}
export default observer(ClubActivityList);
