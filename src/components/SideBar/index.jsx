import React, { useState } from 'react';
import './styles.scss';
import { AlignLeftOutlined } from '@ant-design/icons';
import { AppStyles, Images } from '../../theme';
import { Divider, Drawer, List, Space } from 'antd';
import CommonTextField from '../common/TextField';
import CommonButton from '../common/CommonButton';
import { MENU_LIST } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { css } from 'aphrodite';
import { CommonDropdown } from '../common';
import DataHandler from '../../services/DataHandler';
import { userLoginSuccess } from '../../redux/slicers/user';
import { userSignOutSuccess } from '../../redux/slicers/user';

const SideBar = ({ isDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const changeRoute = (route) => {
    navigate(route);
  };

  const logout = (route) => {
    DataHandler.getStore().dispatch(userSignOutSuccess());
    navigate(route);
  };
  const items = [
    {
      label: 'profile setting',
      key: '0'
    },
    {
      label: 'sign out',
      key: '1'
    }
  ];

  return (
    <>
      <div className={isDrawer ? isDrawer : 'main-sideBar'}>
        {!isDrawer && (
          <div className="logo">
            <img
              src={Images.logo}
              width={'132px'}
              className={css(AppStyles.pointer)}
              onClick={() => changeRoute('/')}
            />
          </div>
        )}
        <Space className="sidebar-routes" direction="vertical">
          <Space direction="vertical" className="content">
            {MENU_LIST?.map((t, i) => (
              <div
                className={`content-list ${
                  location.pathname === t.route ? 'active' : ''
                }`}
                key={i}
                size={20}
                onClick={() => changeRoute(t?.route)}
              >
                <img src={t.src} width={'15px'} height={'15px'} />
                <CommonTextField text={t.title} />
              </div>
            ))}
            <Divider className="line" />
          </Space>

          <Space className="profile" align="center" size={10}>
            <img src={Images.profile} width={'33.75px'} height={'33.75px'} />
            <Space direction="vertical" size={2} align="baseline">
              <CommonTextField
                text={'Andy Warhol'}
                fontSize={'10.5px'}
                lineHeight={'10px'}
                className={`${css(AppStyles.weight7)}`}
              />
              <CommonTextField
                text={'andywarhol@mail.com'}
                fontSize={'9px'}
                lineHeight={'10px'}
              />
            </Space>
          </Space>

          <div className="logout">
            <CommonButton
              onClick={() => {
                logout('/login');
              }}
              text={'Logout'}
            />
          </div>
        </Space>
      </div>
    </>
  );
};

export default SideBar;
