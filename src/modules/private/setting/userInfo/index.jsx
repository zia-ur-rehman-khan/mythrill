import { Col, Form, Row, Space } from 'antd';
import React, { useState } from 'react';
import ProfileImage from '../profileImage';
import { CommonInputField } from '../../../../components';
import { CommonButton, CommonPhoneInput } from '../../../../components/common';
import {
  ALERT_TYPES,
  EMAIL_RULE,
  phoneValidation,
  validatorField
} from '../../../../constants';
import { AppStyles } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import {
  userAvatarRequest,
  userDataUpdateRequest
} from '../../../../redux/slicers/user';
import { toastAlert } from '../../../../services/utils';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = () => {
  const { data } = useSelector((state) => state?.user);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);

    const { fullName } = values;

    const formData = new FormData();
    formData.append('avatar', file);

    dispatch(
      userAvatarRequest({
        avatarPayload: formData,
        responseCallback: (res) => {
          setLoading(false);

          if (res.success) {
            const payloadData = {
              name: fullName,
              profile_image: res?.data?.image_name
            };
            dispatch(
              userDataUpdateRequest({
                payloadData,
                responseCallback: (res) => {
                  setLoading(false);

                  if (res.status) {
                    toastAlert(res.message, ALERT_TYPES.success);
                    // form.resetFields();
                    console.log(res, 'res');
                  } else {
                    console.log(res.errors, 'error');
                  }
                }
              })
            );
            console.log(res, 'res');
          } else {
            console.log(res.errors, 'error');
          }
        }
      })
    );
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="user-info-main">
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          fullName: data?.name,
          phoneNumber: data?.phone,
          email: data?.email
        }}
        onFinishFailed={onFinishFailed}
      >
        <ProfileImage
          profileImage={data?.profile_image}
          setFile={setFile}
          file={file}
        />

        <Row gutter={[20, 10]}>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <CommonInputField
              name="fullName"
              className={'auth'}
              placeholder={'John Smith'}
              rules={[
                {
                  validator: (_, value) => {
                    return validatorField(_, value, 3, 80);
                  }
                }
              ]}
            />
          </Col>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <CommonPhoneInput
              name={'phoneNumber'}
              disabled={true}
              rules={[
                {
                  validator: (_, value) => {
                    return phoneValidation(_, value);
                  }
                }
              ]}
            />
          </Col>
          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <CommonInputField
              name="email"
              type={'email'}
              className={'auth'}
              placeholder={'john.smith@domain.com'}
              rules={EMAIL_RULE}
              disabled={true}
            />
          </Col>
        </Row>

        <Space
          className={css(
            AppStyles.w100,
            AppStyles.justifyEnd,
            AppStyles.mTop10
          )}
        >
          <CommonButton
            width="180px"
            loading={loading}
            text={'Save'}
            htmlType="submit"
          />
        </Space>
      </Form>
    </div>
  );
};

export default UserInfo;
