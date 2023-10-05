import React, { useState } from 'react';
import './styles.scss';
import { AlignLeftOutlined } from '@ant-design/icons';
import { AppStyles, Images } from '../../theme';
import { Divider, Drawer, Layout, List, Menu, Space } from 'antd';
import CommonTextField from '../common/TextField';
import CommonButton from '../common/CommonButton';
import { HOME_ROUTE, MENU_LIST, lOGIN_ROUTE } from '../../constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { css } from 'aphrodite';
import { CommonDropdown, CommonHeading, CommonModal } from '../common';
import DataHandler from '../../services/DataHandler';
import { LogoutRequest, userLoginSuccess } from '../../redux/slicers/user';
import { userSignOutSuccess } from '../../redux/slicers/user';
import { useDispatch, useSelector } from 'react-redux';
import { userPlatform } from '../../services/utils';
import { setCollapsedState } from '../../redux/slicers/stocks';

const SideBarSlider = ({ isDrawer }) => {
  const [logout, setLogout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.user);

  const { Header, Content, Footer, Sider } = Layout;

  const changeRoute = (route) => {
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

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label
    };
  };

  const itemsss = [
    {
      key: '1',
      label: <CommonTextField text={'Home'} />,
      icon: <img width={'15px'} height={'15px'} src={Images.home} />,
      onClick: () => navigate('/')
    },
    {
      key: '2',
      label: <CommonTextField text={'Setting'} />,
      icon: <img width={'15px'} height={'15px'} src={Images.setting} />,
      onClick: () => navigate('/setting')
    }
  ];

  const handelCollapsed = () => {
    setCollapsed(!collapsed);
    dispatch(setCollapsedState(!collapsed));
  };

  return (
    <>
      <Sider collapsible collapsed={collapsed}>
        <div className={'main-sideBars'}>
          <img
            className="collapsed-icon"
            src={!collapsed ? Images.collapsed : Images.close}
            onClick={() => handelCollapsed()}
          />

          <Space className="sidebar-routes" direction="vertical">
            <Menu theme="dark" defaultSelectedKeys={['1']} items={itemsss} />

            <Divider className="line" />

            {collapsed ? (
              <div className="but-col-parent">
                <div className="col-logout">
                  <img width={'15px'} height={'15px'} src={Images.home} />
                </div>
              </div>
            ) : (
              <div className="logout">
                <CommonButton
                  onClick={() => {
                    setLogout(!logout);
                  }}
                  text={'Logout'}
                />
              </div>
            )}
          </Space>
        </div>
      </Sider>

      <CommonModal
        title={
          <CommonHeading
            text={'Are you sure?'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={logout}
        setIsModalVisible={setLogout}
        discription="Do you want to logout?"
        onConfirm={() => {
          dispatch(
            LogoutRequest({
              payloadData: { platform: userPlatform() },
              responseCallback: (res) => {
                if (res.status) {
                  changeRoute(lOGIN_ROUTE);
                  console.log(res.status, 'res');
                } else {
                  console.log(res.errors, 'error');
                }
              }
            })
          );
        }}
      ></CommonModal>
    </>
  );
};

export default SideBarSlider;
