import React from 'react';

import { Modal } from 'antd';
import './styles.scss';

const CommonModal = ({
  setIsModalVisible,
  isModalVisible,
  children,
  width,
  title,
  crossIcon
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
        footer={null}
        width={width}
        title={title}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        {children}
      </Modal>
    </div>
  );
};

export default CommonModal;
