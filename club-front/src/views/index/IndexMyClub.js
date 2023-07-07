import React, { useEffect } from 'react';
import { Card, Col, Row, Avatar } from 'antd';
import { group } from '@/utils/myMethod';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;
function IndexMyClub() {
  // store
  const { indexStore } = useRootStore();
  const navigate = useNavigate();
  useEffect(() => {
    indexStore.getUserClub();
  }, []);
  const onClick = (item) => {
    navigate(`/club/my-club/${item}/intro`);
  };
  return (
    <>
      {group(indexStore.userClubList, 3).map((row, idx) => {
        return (
          <Row gutter={32} key={idx} style={{ marginLeft: 15, padding: '20px 0' }}>
            {row.map((club) => {
              return (
                <Col span={8} className="index-col" key={club['club_id']} onClick={() => onClick(club['club_id'])}>
                  <Card
                    hoverable
                    className="index-card"
                    cover={<img alt="example" src={club['picture']} style={{ height: 150 }} />}>
                    <Meta
                      avatar={<Avatar src={club['type_picture']} />}
                      title={club['club_name']}
                      description={club['type_name']}
                    />
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

export default observer(IndexMyClub);
