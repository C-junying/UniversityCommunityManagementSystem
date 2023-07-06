import React, { useEffect } from 'react';
import { Card, Col, Row, Avatar } from 'antd';
import HeanderTitle from '@/components/other/HeanderTitle';
import { group } from '@/utils/myMethod';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
const { Meta } = Card;
// 我的社团
function MyClub() {
  // store
  const { clubStore } = useRootStore();
  const navigate = useNavigate();
  useEffect(() => {
    clubStore.getUserClubList();
  }, []);
  const onClick = (item) => {
    navigate(`${item}/intro`);
  };
  return (
    <>
      <HeanderTitle title="我的社团" />

      {group(clubStore.userClubList, 3).map((row, idx) => {
        return (
          <Row gutter={32} key={idx} style={{ marginLeft: 10, padding: '20px 0' }}>
            {row.map((club) => {
              return (
                <Col span={6} key={club['club_id']} onClick={() => onClick(club['club_id'])}>
                  <Card
                    hoverable
                    style={{ background: '#FAFAFAD0', minWidth: '280px', maxWidth: '300px' }}
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
export default observer(MyClub);
