import React, { useEffect, useState } from 'react';
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
import {
  getFrequencyDataRequest,
  getFrequencyRequest,
  setFrequencyRequest
} from '../../../redux/slicers/stocks';
import { useDispatch } from 'react-redux';
import { toastAlert } from '../../../services/utils';
import { ALERT_TYPES, frequencyData } from '../../../constants';

const ChartView = ({ chartView, chartviewChange, stockId }) => {
  const [isModal, setIsModal] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [frequencyAlert, setFrequencyAlerttest] = useState([]);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    setIsLoading(true);

    const match = frequency.find((d) => {
      return `${d.slug} + ${d.interval}` === values.frequency;
    });

    dispatch(
      setFrequencyRequest({
        payloadData: {
          slug: match.slug,
          interval: match.interval,
          stock_id: stockId
        },
        responseCallback: (res) => {
          setIsLoading(false);
          setIsModal(false);
          if (res.status) {
            setFrequencyAlerttest([res.data.data]);
            toastAlert(res.message, ALERT_TYPES.success);
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    dispatch(
      getFrequencyDataRequest({
        payloadData: {},
        responseCallback: (res) => {
          setIsLoading(false);

          if (res.status) {
            setFrequency(res?.data?.data);
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );

    dispatch(
      getFrequencyRequest({
        payloadData: {
          stock_id: stockId
        },
        responseCallback: (res) => {
          setIsLoading(false);

          if (res.status) {
            console.log(res, 'check');
            setFrequencyAlerttest(
              res?.data?.data === null ? [] : [res?.data?.data]
            );
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  }, []);

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
          <CommonTextField
            text={frequencyData(frequency, frequencyAlert)?.title}
          />
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
          initialValues={{
            frequency: `${frequencyData(frequency, frequencyAlert)?.slug} + ${
              frequencyData(frequency, frequencyAlert)?.interval
            }`
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name={'frequency'}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Radio.Group className={css(AppStyles.w100)}>
              {frequency?.map((t) => {
                return (
                  <Space
                    key={Math.random()}
                    className={css([
                      AppStyles.w100,
                      AppStyles.spaceBetween,
                      AppStyles.mBottom20
                    ])}
                  >
                    <CommonTextField text={t.title} />
                    <Radio value={`${t.slug} + ${t.interval}`} />
                  </Space>
                );
              })}
            </Radio.Group>
          </Form.Item>
          <CommonButton text={'Save'} htmlType="submit" loading={isLoading} />
        </Form>
      </CommonModal>
    </>
  );
};

export default ChartView;
