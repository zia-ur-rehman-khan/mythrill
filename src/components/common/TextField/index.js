import React from "react";
import "./styles.scss";

const CommonTextField = ({
  topClass,
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
  opacity,
}) => {
  return (
    <div className={`${topClass || ""} paragraph-parent`}>
      <p
        title={title}
        className={`${className || ""} ${onClick ? "c-pointer" : ""}`}
        style={{
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
          whiteSpace: "pre-wrap",
          opacity,
        }}
        onClick={onClick}
      >
        {text || children}
      </p>
    </div>
  );
};

export default CommonTextField;
