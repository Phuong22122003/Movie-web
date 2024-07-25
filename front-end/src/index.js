import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/commons/header';
import "./index.css"
import UserMasterPage from './page/user/user-master-page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserMasterPage />
  </React.StrictMode>
);


