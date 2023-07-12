import React, { useState } from 'react';
import './styles.scss';
import CommonTextField from '../common/TextField';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Divider, Image, Popover, Space } from 'antd';
import { Drawer } from 'antd';

import { AppStyles, Images } from '../../theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { css } from 'aphrodite';
import SideBar from '../SideBar';
import { CommonDropdown, CommonPopOver } from '../common';
import NotificationContent from './NotificationContent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequest } from '../../redux/slicers/user';
import { userPlatform } from '../../services/utils';
import { HOME_ROUTE, SETTING_ROUTE, lOGIN_ROUTE } from '../../constants';

const Header = () => {
  const Navigate = useNavigate();

  const { data } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);

  const changeRoute = (route) => {
    Navigate(route);
  };

  const logout = () => {
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
  };

  const array = [
    {
      label: 'Profile setting',
      onClick: () => changeRoute(SETTING_ROUTE)
    },
    {
      label: 'Sign out',
      onClick: () => logout()
    }
  ];

  const items = array.map((d) => (
    <CommonTextField
      onClick={d.onClick}
      text={d.label}
      fontWeight={600}
      mb={5}
      fontSize={'14px'}
    />
  ));

  return (
    <header className="main-header">
      <div className="mobile">
        <img
          src={Images.sidebar}
          width={'18px'}
          height={'18px'}
          onClick={() => setIsMobile(true)}
        />

        <div className="logo">
          <img
            src={Images.logo}
            onClick={() => changeRoute('/')}
            width={'140px'}
          />
        </div>
        <NotificationContent mobile />
      </div>
      <Space size={20} className="right-side">
        <NotificationContent />
        <Space className="profile" align="center" size={20}>
          <img
            src={data.profile_image || Images.profile}
            width={'33.75px'}
            height={'33.75px'}
            style={{ borderRadius: '50%' }}
          />
          <Space direction="vertical" align="baseline">
            <CommonTextField
              text={data?.name}
              fontSize={'10.5px'}
              lineHeight={'10px'}
              className={`${css(AppStyles.weight7)} ellipsis`}
            />
            <CommonTextField
              text={data?.email}
              fontSize={'9px'}
              lineHeight={'10px'}
              className={'ellipsis'}
            />
          </Space>

          <Popover
            placement="bottom"
            overlayClassName="market-popover"
            content={items}
            trigger="click"
            arrow={false}
          >
            <FontAwesomeIcon
              className={css(AppStyles.pointer)}
              icon={faEllipsisVertical}
            />
          </Popover>
        </Space>
      </Space>

      <Drawer
        title={
          <div className="logo">
            <img
              src={Images.logo}
              width="140px"
              onClick={() => {
                setIsMobile(false);
                changeRoute('/');
              }}
            />
          </div>
        }
        placement="left"
        onClose={() => setIsMobile(false)}
        open={isMobile}
        width="60%"
        className="side-drawer"
      >
        <SideBar isDrawer={'drawer'} />
      </Drawer>
    </header>
  );
};

export default Header;
