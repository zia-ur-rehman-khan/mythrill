import React, { useEffect, useState } from 'react';
import CommonTable from '../../../../components/common/CommonTable';
import { CommonTextField } from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../theme';
import './styles.scss';
import { paymentListRequest } from '../../../../redux/slicers/user';
import { useDispatch } from 'react-redux';
import { getFormattedDateTime } from '../../../../services/utils';

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

  const dataSource = paymentList?.map((t, i) => {
    const data = {
      key: i + 1,
      status: 'Paid',
      date: getFormattedDateTime(t.createdAt, 'DD/MM/YYYY'),
      amount: `$ ${t.amount}.00`,
      description: 'Via Master Card'
    };

    return data;
  });

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: '20%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%'
    }
  ];
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
