import React, { useState } from 'react';
import CommonTextField from '../TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppStyles, Images } from '../../../theme';
import { css } from 'aphrodite';
import CommonDropdown from '../CommonDropdown';
import {
  StockSubscribeRequest,
  StockUnSubscribeRequest,
  getSubscribeStocksRequest
} from '../../../redux/slicers/stocks';
import { useDispatch } from 'react-redux';
import Loader from '../../loader';

const StockCard = ({ value, addIcon }) => {
  const { title, amount, stockUpdate, color, stockId, slug, type } = value;
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(`${slug}`);
  };

  const items = [
    {
      label: 'Favorite',
      key: '0'
    },
    {
      label: 'Remove',
      key: '1'
    }
  ];

  const subscribe = (stockId) => {
    setIsLoading(true);
    const payloadData = { stock_id: stockId };
    dispatch(
      StockSubscribeRequest({
        payloadData,
        responseCallback: (res) => {
          setIsLoading(false);
          if (res.status) {
            console.log(res.status, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  const unSubscribe = (stockId) => {
    setIsLoading(true);

    const payloadData = { stock_id: stockId };
    dispatch(
      StockUnSubscribeRequest({
        payloadData,
        responseCallback: (res) => {
          setIsLoading(false);
          if (res.status) {
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };

  if (isLoading) {
    return (
      <div className="stockCard-loader">
        <Loader size={50} />
      </div>
    );
  }

  return (
    <Space className="stockCard-main">
      <Space direction="vertical">
        <CommonTextField
          text={title}
          fontWeight={600}
          onClick={() => !addIcon && changeRoute()}
        />
        <CommonTextField text={type} color={'#626D7D'} />
      </Space>
      <Space size={10}>
        <Space direction="vertical">
          <CommonTextField text={amount} fontWeight={600} />
          <div className={`color-text ${color}`}>
            <CommonTextField text={stockUpdate} topClass={'small'} />
          </div>
        </Space>
        {addIcon ? (
          <img
            src={Images.add}
            width={'21px'}
            height={'21px'}
            className={css(AppStyles.pointer)}
            onClick={() => subscribe(stockId)}
          />
        ) : (
          <CommonDropdown items={items}>
            <FontAwesomeIcon
              className={css(AppStyles.pointer)}
              icon={faEllipsisVertical}
              onClick={() => unSubscribe(stockId)}
            />
          </CommonDropdown>
        )}
      </Space>
    </Space>
  );
};

export default StockCard;
