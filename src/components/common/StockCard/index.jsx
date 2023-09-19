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
  StockFavouriteRequest,
  StockSubscribeRequest,
  StockUnFavouriteRequest,
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

const StockCard = ({ test, value, addIcon ,count}) => {
  console.log('🚀 ~ file: index.jsx:27 ~ StockCard ~ test:', test);
  const {
    title,
    amount,
    stockUpdate,
    color,
    stockId,
    slug,
    type,
    nameId,
    favourite
  } = value;
  const [isLoading, setIsLoading] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isFavorite, setIsFavourite] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeRoute = () => {
    navigate(STOCK_DETAILE_ROUTE.replace(':id', nameId));
  };

  const items = [];

  if (favourite && test === 'favourite') {
    items.push({
      label: <CommonTextField text={'Un-favourite'} fontWeight={600} />,
      onClick: () => unFavourite(stockId)
    });
  } else if (favourite) {
    items.push(
      {
        label: <CommonTextField text={'Un-favourite'} fontWeight={600} />,
        onClick: () => unFavourite(stockId)
      },
      {
        type: 'divider'
      },
      {
        label: <CommonTextField text={'Remove'} fontWeight={600} />,
        onClick: () => unSubscribe(stockId)
      }
    );
  } else {
    items.push(
      {
        label: <CommonTextField text={'Favourite'} fontWeight={600} />,
        onClick: () => addFavourite(stockId)
      },
      {
        type: 'divider'
      },
      {
        label: <CommonTextField text={'Remove'} fontWeight={600} />,
        onClick: () => unSubscribe(stockId)
      }
    );
  }

  const unFavourite = (stockId) => {
    setIsFavourite(true);
  };

  const addFavourite = (stockId) => {
    setIsLoading(true);
    const payloadData = { stock_id: stockId };
    dispatch(
      StockFavouriteRequest({
        payloadData,
        responseCallback: (res) => {
          setIsLoading(false);
          if (res.status) {
            console.log(res.status, 'res');
            toastAlert(
              'Stock added in favourite successfully',
              ALERT_TYPES.success
            );
          } else {
            dispatch(stockLimitExceed(true));
            console.log(res, 'error');
          }
        }
      })
    );
  };

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
            toastAlert('Stock subscribe successfully', ALERT_TYPES.success);
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

  return (
    <div className="main-card-parent">
      <Space className="stockCard-main">
        <Space align='baseline'>
          <CommonTextField text={`${count}.`}/>
          <Space direction='vertical'>
          <CommonTextField
            text={title}
            fontWeight={600}
            onClick={() => !addIcon && changeRoute()}
            className={'ellipsis'}
          />
          <CommonTextField text={type} color={'#626D7D'} />
          </Space>
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
        discription="Do you want to remove the stock?"
        loading={isLoading}
        onConfirm={() => {
          setIsLoading(true);
          const payloadData = { stock_id: stockId, nameId: nameId };
          dispatch(
            StockUnSubscribeRequest({
              payloadData,
              responseCallback: (res) => {
                setIsLoading(false);

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
      <CommonModal
        title={
          <CommonHeading
            text={'Are you sure?'}
            textAlign="center"
            className={css(AppStyles.mTop20)}
          />
        }
        isModalVisible={isFavorite}
        setIsModalVisible={setIsFavourite}
        discription="Do you want to remove from favourite?"
        loading={isLoading}
        onConfirm={() => {
          setIsLoading(true);
          const payloadData = { stock_id: stockId };
          dispatch(
            StockUnFavouriteRequest({
              payloadData,
              responseCallback: (res) => {
                setIsLoading(false);
                if (res.status) {
                  console.log(res.status, 'res');
                  toastAlert(
                    'Stock removed from favourite successfully',
                    ALERT_TYPES.success
                  );
                } else {
                  console.log(res, 'error');
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
