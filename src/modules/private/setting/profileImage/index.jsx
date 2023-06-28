import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import { Images } from '../../../../theme';
import './styles.scss';
import { Loader } from '../../../../components';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ProfileImage = ({ setImageUrl, imageUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = ({ fileList }) => {
    getBase64(fileList[fileList.length - 1].originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  return (
    <>
      <Upload
        className="my-uploader"
        name="avatar"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleChange}
      >
        {loading ? (
          <Loader />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            width={'100%'}
            height={'100%'}
            style={{ borderRadius: '50%' }}
          />
        ) : (
          <img
            src={Images.profileIcon}
            alt="avatar"
            width={'100%'}
            height={'100%'}
            style={{ borderRadius: '50%' }}
          />
        )}
      </Upload>
    </>
  );
};
export default ProfileImage;
