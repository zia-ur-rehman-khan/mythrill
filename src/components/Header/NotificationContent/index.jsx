import React, { useEffect, useState } from 'react';
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
  getNotificationRequest,
  getNotificationsCountRequest,
  getlatestNotification,
  seeNotificationsRequest,
  seeNotificationsRequestSuccess
} from '../../../redux/slicers/stocks';
import { useNavigate } from 'react-router-dom';
import { useCommonNotification } from '../../../services/utils';
import { CACHE_NAME, NOTIFICATION_KEY } from '../../../constants';
import { SOCKET_URL } from '../../../config/webService';
import initializeSocket from '../../../socket';
import { io } from 'socket.io-client';

const NotificationContent = ({ mobile }) => {
  const { notificationList, notificationCount } = useSelector(
    (state) => state?.stocks
  );
  const { id } = useSelector((state) => state?.user?.data);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { navigateOnCondition } = useCommonNotification();

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
            const extraDetails = JSON.parse(
              res?.data?.data?.notifications?.extra
            );
            navigateOnCondition(extraDetails);

            setVisible(false);
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const clickNotification = (extra) => {
    const extraDetails = JSON.parse(extra);
    navigateOnCondition(extraDetails);
    setVisible(false);
  };

  const seeNotifications = (id) => {
    dispatch(seeNotificationsRequestSuccess());
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

  const content = notificationList?.map((t, index) => {
    const { id, createdAt } = JSON.parse(t.extra);

    return (
      <div
        key={index}
        className={`main ${!t.is_read && 'hide'}`}
        onClick={() =>
          t.is_read ? clickNotification(t.extra) : readNotification(id)
        }
      >
        <div className={`notification-content }`}>
          <Space
            align="start"
            className={css(AppStyles.w100, AppStyles.spaceBetween)}
          >
            <Space align="start">
              <img src={Images.notifyIcon} className="notify-icon" />
              <Space size={2} direction="vertical">
                <CommonTextField text={t.title} fontWeight={600} />
                <CommonTextField
                  text={t.description}
                  topClass={'notify-content'}
                />
              </Space>
            </Space>
            <CommonTextField
              text={moment(new Date(createdAt)).fromNow()}
              color={'#93969E'}
            />
          </Space>
        </div>
        {/* <Divider className="border-line" /> */}
      </div>
    );
  });

  useEffect(() => {
    const socket = io(`wss://${SOCKET_URL}`, {
      extraHeaders: { userid: id }
    });

    const notification = () => {
      dispatch(
        getNotificationRequest({
          payloadData: {},
          responseCallback: (res) => {
            if (res.status) {
              console.log(res, 'check');
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );

      dispatch(
        getNotificationsCountRequest({
          payloadData: {},
          responseCallback: (res) => {
            if (res.status) {
              console.log(res, 'check');
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );
    };

    notification();

    // const checkCache = () => {
    //   if (document.visibilityState === 'visible' && document.hidden === false) {
    //     getCachValue(CACHE_NAME, NOTIFICATION_KEY)
    //       .then((notificationValue) => {
    //         if (notificationValue !== null && notificationValue) {
    //           console.log('cache value', notificationValue);
    //           notification();
    //           addToCache(CACHE_NAME, NOTIFICATION_KEY, false).catch((error) => {
    //             console.log('add cache value error', error);
    //           });
    //         } else {
    //           console.log('cache value not found');
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error reading value from cache:', error);
    //       });
    //   }
    // };

    const listener1 = (...args) => {
      const data = JSON.parse(args?.[0])?.data;
      data.extra = JSON.stringify(data.extra);

      dispatch(getlatestNotification(data));
    };

    socket.on('push_notification', listener1);

    // document.addEventListener('visibilitychange', checkCache);

    return () => {
      socket.off('push_notification', listener1);

      // document.removeEventListener('visibilitychange', checkCache);
    };
  }, []);

  return (
    <CommonPopOver
      placement={mobile ? 'leftBottom' : ''}
      content={content}
      title={title}
      trigger="click"
      setVisible={setVisible}
      visible={visible}
    >
      <div className="notification-parent" onClick={seeNotifications}>
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
        />
      </div>
    </CommonPopOver>
  );
};

export default NotificationContent;
