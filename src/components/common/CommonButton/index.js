import { Button } from 'antd';
import React, { Children } from 'react';
import './styles.scss';

const CommonButton = ({
  text,
  Children,
  classname,
  topClass,
  width,
  height,
  background,
  borderRadius,
  border,
  color,
  onClick,
  htmlType,
  disabled,
  type = 'primary',
  fontSize,
  padding,
  icon,
  loading
}) => {
  return (
    <div className={`button-parent ${topClass || ''} `}>
      <Button
        loading={loading}
        icon={icon}
        type={type}
        style={{
          fontSize,
          width,
          height,
          background,
          borderRadius,
          color,
          border,
          padding
        }}
        className={classname}
        onClick={onClick}
        htmlType={htmlType}
        disabled={disabled}
      >
        {text || Children}
      </Button>
    </div>
  );
};

export default CommonButton;
