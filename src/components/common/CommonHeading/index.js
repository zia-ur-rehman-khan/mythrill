import { Typography } from 'antd';
import React from 'react';
import './styles.scss';

const { Title } = Typography;

const CommonHeading = ({
  text,
  children,
  font,
  fontSize,
  color,
  mb = 0,
  mt = 0,
  onClick,
  textAlign,
  fontWeight,
  fontFamily,
  letterSpacing,
  textDecoration,
  paddingLeft,
  className,
  title,
  lineHeight,
  level,
  width
}) => {
  return (
    <Title
      level={level}
      title={title}
      className={`${className || ''} ${onClick ? 'cp' : ''}`}
      style={{
        width,
        margin: 0,
        padding: 0,
        fontFamily: font,
        fontSize,
        color,
        marginBottom: mb,
        marginTop: mt,
        textAlign,
        fontFamily,
        fontWeight,
        letterSpacing,
        lineHeight,
        paddingLeft,
        textDecoration,
        whiteSpace: 'pre-wrap'
      }}
      onClick={onClick}
    >
      {text || children}
    </Title>
  );
};

export default CommonHeading;
