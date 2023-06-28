import React, { useState } from 'react';
import './styles.scss';
import { AlignLeftOutlined } from '@ant-design/icons';
import { AppStyles, Images } from '../../theme';
import { Divider, Drawer, List, Space } from 'antd';
import CommonTextField from '../common/TextField';
import CommonButton from '../common/CommonButton';
import { HOME_ROUTE, MENU_LIST } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { css } from 'aphrodite';
import { CommonDropdown } from '../common';
import DataHandler from '../../services/DataHandler';
import { LogoutRequest, userLoginSuccess } from '../../redux/slicers/user';
import { userSignOutSuccess } from '../../redux/slicers/user';
import { useDispatch, useSelector } from 'react-redux';
import { userPlatform } from '../../services/utils';

const SideBar = ({ isDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.user);

  const changeRoute = (route) => {
    navigate(route);
  };

  const logout = () => {
    dispatch(
      LogoutRequest({
        payloadData: { platform: userPlatform() },
        responseCallback: (res) => {
          if (res.status) {
            changeRoute(HOME_ROUTE);
            console.log(res.status, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
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
            <img
              src={data?.profile_image || Images.profile}
              width={'33.75px'}
              height={'33.75px'}
              style={{ borderRadius: '50%' }}
            />
            <Space direction="vertical" size={2} align="baseline">
              <CommonTextField
                text={data?.name}
                fontSize={'10.5px'}
                lineHeight={'10px'}
                className={`${css(AppStyles.weight7)}`}
              />
              <CommonTextField
                text={data?.email}
                fontSize={'9px'}
                lineHeight={'10px'}
              />
            </Space>
          </Space>

          <div className="logout">
            <CommonButton
              onClick={() => {
                logout();
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
