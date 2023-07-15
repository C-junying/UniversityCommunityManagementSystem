import React from 'react';
import { Spin } from 'antd';
import './index.css';
export default function Loading() {
  return (
    <div className="loading" id="club-loading">
      <Spin tip="加载中" size="large" />
    </div>
  );
}
