import React from 'react';
import CommonTable from '../../../../components/common/CommonTable';
import { CommonTextField } from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles } from '../../../../theme';
import './styles.scss';

const PaymentList = () => {
  const array = [1, 2, 3];

  const dataSource = array?.map((t, i) => {
    const data = {
      key: i + 1,
      status: 'Paid',
      date: '01/07/2023',
      amount: '$ 569.00',
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
        <CommonTable dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default PaymentList;
