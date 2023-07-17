import React, { useMemo } from 'react';
import Detailes from './detailes';
import { useSelector } from 'react-redux';
import { USER_SUBSCRIPTION_STATUS } from '../../../../constants';
import Free from './free';

const ManageSubscription = () => {
  const { data } = useSelector((state) => state?.user);

  const getContentByPathname = useMemo(() => {
    if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.FREE)
      return <Free detailes={data['createdAt']} />;
    else if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.CANCLED) {
      return <Detailes cancel detailes={data['pay_details']} />;
    } else if (data['subscribe_status'] === USER_SUBSCRIPTION_STATUS.PAUSED) {
      return <Detailes paused detailes={data['pay_details']} />;
    } else {
      return <Detailes detailes={data['pay_details']} />;
    }
  }, [data]);

  return <>{getContentByPathname}</>;
};

export default ManageSubscription;
