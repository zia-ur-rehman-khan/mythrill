/* eslint-disable react/prop-types */
import React from "react";
import { Form, Input } from "antd";
import "./styles.scss";

const CommonInputField = ({
  placeholder,
  name,
  // label,
  className,
  maxLength,
  showCount,
  addonBefore,
  type,
  // onChange,
  // onBlur,
  // value,
  // errors,
  // touch,
  height,
  suffix,
  rules,
}) => {
  return (
    <Form.Item name={name} rules={rules}>
      <Input
        style={{ height }}
        type={type}
        // name={name}
        addonBefore={addonBefore}
        showCount={showCount}
        maxLength={maxLength}
        className={`ad-input  ${className || ""}`}
        placeholder={placeholder}
        // onChange={onChange}
        // onBlur={onBlur}
        // value={value}
        suffix={suffix || true}
      />
      {/* {errors && touch && (
        <p
          style={{
            color: "red",
            fontSize: "13px",
            marginBottom: "0",
          }}
        >
          {errors[name]}
        </p>
      )} */}
    </Form.Item>
  );
};

export default CommonInputField;
