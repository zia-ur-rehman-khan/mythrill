import React, { useEffect, useState } from 'react';
import './styles.scss';
import { CommonTextField } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Space } from 'antd';
import { AppStyles } from '../../../../theme';
import { css } from 'aphrodite';
import MeterSide from './MeterSide';
import {
  getSubscribeDataRealTime,
  preCloseDataRequest,
  trendingListRequest
} from '../../../../redux/slicers/stocks';
import {
  stocksdataManipulatorObject,
  trendGraphManipulator
} from '../../../../manipulators/stocksName';
import initializeSocket from '../../../../socket';
import { SOCKET_URL } from '../../../../config/webService';

const MeterContent = () => {
  // const trend = useSelector((state) => state?.stocks?.trendData);
  const [trendData, setTrendData] = useState([]);
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

  dispatch(
    preCloseDataRequest({
      payloadData: {},
      responseCallback: (res) => {
        if (res.status) {
          console.log(res, 'res');
          setTrendData(trendGraphManipulator(res?.data?.data));
        } else {
          console.log(res.errors, 'error');
        }
      }
    })
  );

  const listener1 = (...args) => {
    console.log('preColsed', JSON.parse(args));

    const newData = stocksdataManipulatorObject(JSON.parse(args).data);

    const filter = trendData.map((d) => {
      const match = newData.nameId === d.nameId;

      if (match) {
        return {
          ...d,
          overallTrend: newData.overallTrend
        };
      }

      return d;
    });

    setTrendData(filter);
  };

  useEffect(() => {
    const socket = initializeSocket(`wss://${SOCKET_URL}`);
    socket.on('preclose_alerts', listener1);

    return () => {
      socket.off('preclose_alerts', listener1);
    };
  }, []);

  return (
    <div className="meter-content-parent">
      <div className="left-content">
        <CommonTextField fontWeight={500} text={'Please choose your index:'} />
        <Space className={css(AppStyles.mTop10)} size={5} direction="vertical">
          {trendData?.map((t, i) => (
            <Space>
              <CommonTextField topClass={'small'} text={`${i + 1}.`} />
              <Space size={4} align="center">
                <img
                  style={{ borderRadius: '50%' }}
                  width={'20px'}
                  height={'20px'}
                  src={t.src}
                />
                <CommonTextField
                  fontWeight={i === select && 700}
                  fontSize={i === select && '11px'}
                  onClick={() => setSelect(i)}
                  topClass={'small title-text'}
                  text={t.title}
                />
              </Space>
            </Space>
          ))}
        </Space>
      </div>
      <div className="right-content">
        <MeterSide select={select} trend={trendData} />
      </div>
    </div>
  );
};

export default MeterContent;
