import React, { useEffect } from 'react';
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

const ProfileImage = ({ setFile, file, profileImage }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleChange = (file) => {
    setLoading(true);
    setFile(file?.fileList[file?.fileList.length - 1].originFileObj ?? null);

    getBase64(
      file?.fileList[file?.fileList.length - 1].originFileObj,
      (url) => {
        setLoading(false);
        setImageUrl(url);
      }
    );
  };

  return (
    <div className="main-profile">
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
      <div className="edit-icon">
        <img src={Images.editIcon} />
      </div>
    </div>
  );
};
export default ProfileImage;
