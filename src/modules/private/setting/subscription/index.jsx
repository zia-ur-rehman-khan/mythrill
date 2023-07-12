import React, { useMemo } from 'react';
import Detailes from './detailes';
import { useSelector } from 'react-redux';
import { USER_SUBSCRIPTION_STATUS } from '../../../../constants';
import Free from './free';

const ManageSubscription = () => {
  const { data } = useSelector((state) => state?.user);
  console.log('🚀 ~ file: index.jsx:9 ~ ManageSubscription ~ data:', data);

  const getContentByPathname = useMemo(() => {
    if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.FREE)
      return <Free />;
    else if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.CANCLED) {
      return <Detailes cancel />;
    } else if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.PAUSED) {
      return <Detailes paused />;
    } else {
      return <Detailes />;
    }
  }, [data]);

  return <>{getContentByPathname}</>;
};

export default ManageSubscription;
