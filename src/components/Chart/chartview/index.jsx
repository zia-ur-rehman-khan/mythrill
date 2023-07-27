import React, { useState } from 'react';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField
} from '../../common';
import { css } from 'aphrodite';
import { AppStyles, Images } from '../../../theme';
import { Form, Radio, Space } from 'antd';
import './styles.scss';

const ChartView = ({ chartView, chartviewChange }) => {
  const [isModal, setIsModal] = useState(false);
  const [frequency, setFrequency] = useState('Every Day');
  const radio = [
    'Every Minutes',
    'Every 30 Minutes',
    'Every Hour',
    'Every Day',
    'Every Week',
    'Every Month'
  ];

  const onFinish = (values) => {
    setIsModal(false);
    setFrequency(values?.frequency);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Space
        className={css(
          AppStyles.spaceBetween,
          AppStyles.w100,
          AppStyles.mTop15
        )}
      >
        <Space
          className={css(AppStyles.pointer)}
          onClick={() => setIsModal(true)}
        >
          <img src={Images.freNotification} />
          <CommonTextField text={frequency} />
          <img src={Images.rightArrow} />
        </Space>
        <Space size={0} className={`view-tab ${css(AppStyles.theme3Color)}`}>
          <Space
            onClick={() => {
              chartviewChange('myThril');
            }}
            className={`tab ${chartView === 'myThril' && 'active'}`}
          >
            <CommonTextField text={'Mythril'} />
          </Space>
          <Space
            onClick={() => {
              chartviewChange('trading');
            }}
            className={`tab ${chartView === 'trading' && 'active'}`}
          >
            <CommonTextField text={'Trading view'} />
          </Space>
        </Space>
      </Space>
      <CommonModal
        width={'400px'}
        title={
          <CommonHeading
            fontSize={'24px'}
            text={'Signal Frequency Alert'}
            textAlign="center"
            className={css(AppStyles.mBottom10)}
          />
        }
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
      >
        <Form
          name="basic"
          initialValues={{ frequency: frequency }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name={'frequency'}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Radio.Group className={css(AppStyles.w100)}>
              {radio.map((t, index) => (
                <Space
                  className={css([
                    AppStyles.w100,
                    AppStyles.spaceBetween,
                    AppStyles.mBottom20
                  ])}
                >
                  <CommonTextField text={t} />
                  <Radio value={t} />
                </Space>
              ))}
            </Radio.Group>
          </Form.Item>
          <CommonButton text={'Save'} htmlType="submit" />
        </Form>
      </CommonModal>
    </>
  );
};

export default ChartView;
