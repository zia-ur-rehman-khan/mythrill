import {
  BASE_URL,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_TOKEN_EXPIRE
} from '../config/webService';
import { refreshToken } from '../redux/slicers/user';
import axios from 'axios';
import DataHandler from '../services/DataHandler';
import {
  getCurrentRefreshToken,
  handleUserSignout,
  toastAlert
} from '../services/utils';
import { ALERT_TYPES } from '../constants';
// GENERATE REFRESH TOKEN
export const refreshAccessToken = async () => {
  let token = getCurrentRefreshToken();
  if (token) {
    const url = '/users/refresh-token';
    const method = 'POST';
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios({
        baseURL: BASE_URL,
        method: method,
        url: url,
        headers: headers
      });

      const resToken = response?.data?.data?.data;

      DataHandler.getStore().dispatch(refreshToken(resToken));

      return resToken?.access_token;
    } catch (error) {
      console.log({ refreshTokenError: error });
      toastAlert(ERROR_TOKEN_EXPIRE, ALERT_TYPES.error);
      handleUserSignout();
      return false;
    }
  } else {
    handleUserSignout();
    return false;
  }
};
