import { Col, Form, Row, Space, Tooltip } from 'antd';
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
import { AppStyles, Images } from '../../../../theme';
import { css } from 'aphrodite';
import './styles.scss';
import {
  userAvatarRequest,
  userDataUpdateRequest
} from '../../../../redux/slicers/user';
import { toastAlert } from '../../../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faSearch,
  faWarning
} from '@fortawesome/free-solid-svg-icons';

const UserInfo = () => {
  const { data } = useSelector((state) => state?.user);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { fullName } = values;

    const formData = new FormData();
    formData.append('avatar', file);

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastAlert('maximum size of image is 5mb', ALERT_TYPES.info);
      } else {
        setLoading(true);

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
                        toastAlert(
                          'Profile updated successfully',
                          ALERT_TYPES.success
                        );
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
      }
    } else if (values.fullName !== data?.name) {
      setLoading(true);

      const payloadData = {
        name: fullName
      };
      dispatch(
        userDataUpdateRequest({
          payloadData,
          responseCallback: (res) => {
            setLoading(false);

            if (res.status) {
              toastAlert('Profile updated successfully', ALERT_TYPES.success);
              // form.resetFields();
              console.log(res, 'res');
            } else {
              console.log(res.errors, 'error');
            }
          }
        })
      );
    } else {
      toastAlert('No changes', ALERT_TYPES.info);
    }
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
          {data['login_with'] === 'google' ||
          data['login_with'] === 'facebook' ? null : (
            <Col
              lg={{ span: 8 }}
              md={{ span: 8 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
            >
              <CommonPhoneInput
                className={'disabled'}
                name={'phoneNumber'}
                disabled={true}
                rules={false}
              />
            </Col>
          )}

          <Col
            lg={{ span: 8 }}
            md={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 24 }}
          >
            <CommonInputField
              name="email"
              type={'email'}
              className={'auth disabled'}
              placeholder={'john.smith@domain.com'}
              rules={EMAIL_RULE}
              disabled={true}
              suffix={
                <Tooltip title="Email verification">
                  <img
                    src={Images.info}
                    width={'20px'}
                    height={'20px'}
                    className={css(AppStyles.pointer)}
                  />
                </Tooltip>
              }
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
