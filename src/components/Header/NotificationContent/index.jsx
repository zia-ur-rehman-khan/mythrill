import React from 'react';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../theme';
import { CommonPopOver, CommonTextField } from '../../common';
import { Divider, Space } from 'antd';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  getNotificationReadAllRequest,
  getNotificationReadRequest,
  seeNotificationsRequest
} from '../../../redux/slicers/stocks';

const NotificationContent = ({ mobile }) => {
  const { notificationList, notificationCount } = useSelector(
    (state) => state?.stocks
  );
  const dispatch = useDispatch();

  console.log(
    '🚀 ~ file: index.jsx:11 ~ NotificationContent ~ list:',
    notificationList
  );

  // const { bitCoin, netflix } = Images;

  const markAllRead = () => {
    dispatch(
      getNotificationReadAllRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const readNotification = (id) => {
    dispatch(
      getNotificationReadRequest({
        payloadData: {},
        query: `id=${id}`,
        responseCallback: (res) => {
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const seeNotifications = (id) => {
    dispatch(
      seeNotificationsRequest({
        payloadData: {},
        responseCallback: (res) => {
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const title = (
    <Space className={css(AppStyles.w100, AppStyles.spaceBetween)}>
      <CommonTextField
        text={'Notifications'}
        fontWeight={600}
        fontSize={'15px'}
      />
      <CommonTextField
        onClick={() => {
          markAllRead();
        }}
        text={'Mark all as read'}
        topClass={'small'}
        textDecoration="underline"
      />
    </Space>
  );

  // const array = [netflix, bitCoin, netflix, bitCoin, netflix, bitCoin, netflix];

  const content = notificationList?.map((t, index) => (
    <div
      className={`main ${!t.is_read && 'hide'}`}
      onClick={() => readNotification(t.id)}
    >
      <div className={`notification-content }`}>
        <Space
          align="start"
          className={css(AppStyles.w100, AppStyles.spaceBetween)}
        >
          <Space align="start">
            {/* <img src={netflix} /> */}
            <Space size={2} direction="vertical">
              <CommonTextField text={t.title} fontWeight={600} />
              <CommonTextField text={t.description} topClass={'small'} />
            </Space>
          </Space>
          <CommonTextField
            text={moment(new Date(t.createdAt)).fromNow()}
            color={'#93969E'}
          />
        </Space>
      </div>
      <Divider className="border-line" />
    </div>
  ));

  return (
    <CommonPopOver
      placement={mobile ? 'leftBottom' : ''}
      content={content}
      title={title}
      trigger="click"
    >
      <div className="notification-parent">
        {notificationCount !== 0 && (
          <div className="count">
            <CommonTextField text={notificationCount} fontSize={'9px'} />
          </div>
        )}
        <img
          src={Images.notification}
          width={'20px'}
          height={'22px'}
          className={css(AppStyles.pointer)}
          onClick={seeNotifications}
        />
      </div>
    </CommonPopOver>
  );
};

export default NotificationContent;
