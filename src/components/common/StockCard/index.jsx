import React, { useState } from 'react';
import CommonTextField from '../TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import { Dropdown, Popover, Space } from 'antd';
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
  const { title, amount, stockUpdate, color, stockId, slug, type, nameId } =
    value;
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(`stock/${nameId}`);
  };

  const array = [
    {
      label: 'Favorite'
    },
    {
      label: 'Remove',
      onClick: () => unSubscribe(stockId)
    }
  ];

  const items = array.map((d) => (
    <CommonTextField
      onClick={d.onClick}
      text={d.label}
      fontWeight={600}
      mb={5}
    />
  ));

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

  // if (isLoading) {
  //   return (
  //     <div className="stockCard-loader">
  //       <Loader size={50} />
  //     </div>
  //   );
  // }

  return (
    <div className="main-card-parent">
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
            <Popover
              placement="bottom"
              overlayClassName="market-popover"
              content={items}
              trigger="click"
              arrow={false}
            >
              <FontAwesomeIcon
                className={css(AppStyles.pointer)}
                icon={faEllipsisVertical}
                // onClick={() => unSubscribe(stockId)}
              />
            </Popover>
          )}
        </Space>
      </Space>
      {isLoading && (
        <div className="loader-main">
          <Loader size={50} />
        </div>
      )}
    </div>
  );
};

export default StockCard;
