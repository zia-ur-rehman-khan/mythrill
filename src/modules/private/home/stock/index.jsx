import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';
import { Col, Row, Select, Space } from 'antd';
import {
  CommonButton,
  CommonHeading,
  CommonModal,
  CommonTextField,
  GraphFilter,
  SmallChart
} from '../../../../components';
import { css } from 'aphrodite';
import { AppStyles, Colors } from '../../../../theme';
import { Images } from '../../../../theme';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  forGreen,
  forRed,
  forYellow,
  icons,
  signalClass
} from '../../../../constants';
import AddStock from '../market/addStock';
import styles from '../../../../theme/AppStyles';
import MeterContent from '../meterContent';
import { setFilter } from '../../../../redux/slicers/stocks';
import MainStock from '../mainStock';

const Stock = () => {
  const [isModal, setIsModal] = useState(false);

  const stocksData = useSelector((state) => state?.stocks?.stocksData);
  const collapse = useSelector((state) => state?.stocks?.collapse);

  const stocksItems = useSelector((state) => state?.stocks?.stocksSubscribe);
  const searchText = useSelector((state) => state?.user.search);
  const filter = useSelector((state) => state?.stocks?.filter);

  const filteredStockItems = stocksItems?.filter((d) =>
    d?.nameId?.toLowerCase?.()?.match?.(searchText?.toLowerCase())
  );

  const renderStockItems = useMemo(
    () => (
      <Row gutter={[20, 20]}>
        {filteredStockItems?.length > 0 &&
          filteredStockItems?.map((stock) => {
            return <MainStock nameId={stock?.nameId} />;
          })}
      </Row>
    ),
    [filteredStockItems, stocksData, filter]
  );

  return (
    <div className="stock-parent">
      {/* <GraphFilter /> */}
      <MeterContent />
      <div className="stock-content">
        {renderStockItems}
        {stocksItems?.length === 0 && (
          <>
            <div className="empty-stock">
              <img src={Images.emptyStock} width={'225px'} height={'216px'} />
              <CommonHeading
                level={1}
                text={'Stock Not Selected'}
                textAlign={'center'}
              />
              <CommonButton
                text={'Add Stock/Crypto'}
                background="rgba(118, 101, 193, 0.1)"
                onClick={() => setIsModal(true)}
              />
            </div>
            {isModal && (
              <CommonModal
                title={
                  <CommonHeading
                    text={'Add Stock/Crypto'}
                    textAlign="center"
                    className={css(AppStyles.mBottom10)}
                  />
                }
                isModalVisible={isModal}
                setIsModalVisible={setIsModal}
              >
                <AddStock />
              </CommonModal>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Stock;
