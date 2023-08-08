import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutRequest } from '../../redux/slicers/user';
import { userPlatform } from '../../services/utils';
import { HOME_ROUTE, SETTING_ROUTE, lOGIN_ROUTE } from '../../constants';

const Header = () => {
  const Navigate = useNavigate();
  const { data } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the modal when the route changes
    setIsMobile(false);
  }, [location]);

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

  const items = [
    {
      label: <CommonTextField text={'Profile setting'} fontWeight={600} />,
      onClick: () => changeRoute(SETTING_ROUTE)
    },
    {
      type: 'divider'
    },
    {
      label: <CommonTextField text={'Sign out'} fontWeight={600} />,
      onClick: () => logout()
    }
  ];

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
        <Space className="profile" align="center" size={10}>
          <img
            src={data.profile_image || Images.profile}
            width={'33.75px'}
            height={'33.75px'}
            style={{ borderRadius: '50%' }}
          />
          <Space direction="vertical" align="baseline" size={3}>
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

          <CommonDropdown items={items}>
            <FontAwesomeIcon
              className={css(AppStyles.pointer)}
              icon={faEllipsisVertical}
            />
          </CommonDropdown>
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
