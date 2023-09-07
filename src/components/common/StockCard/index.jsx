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
  getSubscribeStocksRequest,
  stockLimitExceed
} from '../../../redux/slicers/stocks';
import { useDispatch } from 'react-redux';
import Loader from '../../loader';
import { ALERT_TYPES, STOCK_DETAILE_ROUTE } from '../../../constants';
import { toastAlert } from '../../../services/utils';
import CommonModal from '../CommonModal';
import CommonHeading from '../CommonHeading';

const StockCard = ({ value, addIcon }) => {
  const { title, amount, stockUpdate, color, stockId, slug, type, nameId } =
    value;
  const [isLoading, setIsLoading] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(STOCK_DETAILE_ROUTE.replace(':id', nameId));
  };

  const items = [
    {
      label: <CommonTextField text={'Favorite'} fontWeight={600} />
    },
    {
      type: 'divider'
    },
    {
      label: <CommonTextField text={'Remove'} fontWeight={600} />,
      onClick: () => unSubscribe(stockId)
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
            toastAlert('Stock subscribe susccessfully', ALERT_TYPES.success);
          } else {
            dispatch(stockLimitExceed(true));
            console.log(res, 'error');
          }
        }
      })
    );
  };

  const unSubscribe = (stockId) => {
    setIsRemove(true);
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
            className={'ellipsis'}
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
              />
            </CommonDropdown>
          )}
        </Space>
      </Space>
      {isLoading && (
        <div className="loader-main">
          <Loader size={50} />
        </div>
      )}
      <CommonModal
        title={
          <CommonHeading
            text={'Are you sure?'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isRemove}
        setIsModalVisible={setIsRemove}
        discription="Do you want to remove the card?"
        onConfirm={() => {
          const payloadData = { stock_id: stockId, nameId: nameId };
          dispatch(
            StockUnSubscribeRequest({
              payloadData,
              responseCallback: (res) => {
                if (res.status) {
                  dispatch(stockLimitExceed(false));
                  console.log(res, 'res');
                } else {
                  console.log(res.errors, 'error');
                }
              }
            })
          );
        }}
      ></CommonModal>
    </div>
  );
};

export default StockCard;
