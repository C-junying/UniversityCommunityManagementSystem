import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RootStoreProvider } from './stores/RootStore';
import { Spin } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <RootStoreProvider>
      <React.Suspense fallback={<Spin tip="加载中" size="large" />}>
        <App />
      </React.Suspense>
    </RootStoreProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
