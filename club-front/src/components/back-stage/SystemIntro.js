import React from 'react';
import { Descriptions } from 'antd';
// 系统信息
function SystemIntro(props) {
  const descList = [
    { label: '项目名称', description: '高校社团管理系统' },
    { label: '前端开发', description: 'React + Ant Design + Mobx' },
    { label: '后端开发', description: 'NodeJS + Express' },
    { label: '数据库', description: 'MySQL8' },
    { label: '项目开发工具', description: 'Visual Studio Code' },
    { label: '项目运行环境', description: 'NodeJS + MySQL8' },
    { label: '开发者', description: '柴颖' },
    { label: '毕业院校', description: '集美大学' },
    { label: '专业', description: '软件工程' },
    { label: '邮箱', description: 'doufukeai@163.com' },
    { label: '联系方式', description: '19859252969' },
  ];
  return (
    <Descriptions
      bordered
      title={props.title}
      size="default"
      column={3}
      labelStyle={{ width: '150px', textAlign: 'center' }}>
      {descList.map((val, index) => {
        return (
          <Descriptions.Item label={val.label} span={3} key={index}>
            {val.description}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}

export default SystemIntro;
