import React from 'react';

import { Modal, Space } from 'antd';
import './styles.scss';
import CommonTextField from '../TextField';
import CommonButton from '../CommonButton';

const CommonModal = ({
  setIsModalVisible,
  isModalVisible,
  children,
  width,
  title,
  discription,
  onConfirm
}) => {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Modal
        className={discription && 'confirmation-modal'}
        footer={null}
        width={width}
        title={title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        {discription ? (
          <Space size={20} direction="vertical" className="confirm-content">
            <CommonTextField text={discription} />
            <CommonButton text={'Confirm'} onClick={onConfirm} />
            <CommonButton
              text={'Not Now'}
              onClick={handleOk}
              background="none"
              border={'1px solid #ffff'}
              topClass={'not-now'}
            />
          </Space>
        ) : (
          children
        )}
      </Modal>
    </div>
  );
};

export default CommonModal;
