import React, { useEffect, useMemo, useState } from 'react';
import CommonTable from '../../../../components/common/CommonTable';
import { CommonTextField } from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../theme';
import './styles.scss';
import { paymentListRequest } from '../../../../redux/slicers/user';
import { useDispatch } from 'react-redux';
import { getFormattedDateTime } from '../../../../services/utils';

const paymentHeading = ['Status', 'Date', 'Amount', 'Description'];

const PaymentList = () => {
  const dispatch = useDispatch();
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(
      paymentListRequest({
        payloadData: {},
        responseCallback: (res) => {
          setLoading(false);

          if (res.status) {
            setPaymentList(res.data.data);
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  }, []);

  const dataSource = useMemo(
    () =>
      paymentList?.map((t, i) => {
        const data = {
          key: i + 1,
          status: 'Paid',
          date: getFormattedDateTime(t.createdAt, 'DD/MM/YYYY'),
          amount: `$ ${t.amount}.00`,
          description: 'Via Master Card'
        };

        return data;
      }),
    [paymentList]
  );

  const columns = useMemo(
    () =>
      paymentHeading?.map((t) => {
        const data = {
          title: t,
          dataIndex: t.toLowerCase(),
          key: t.toLowerCase(),
          width: '20%'
        };
        return data;
      }),
    []
  );

  return (
    <div className="payment-list">
      <CommonTextField
        fontSize={'16px'}
        text={'Payment Listing'}
        fontWeight={600}
        className={css(AppStyles.mBottom15)}
      />
      <div className="tabel-list-main">
        <CommonTable
          dataSource={dataSource}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PaymentList;
