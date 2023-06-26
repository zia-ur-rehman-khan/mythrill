import { BASE_URL } from '../config/webService';
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
    const url = '/auth/refreshToken';
    const method = 'POST';
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios({
        baseURL: BASE_URL,
        method: method,
        url: url,
        headers: headers
      });

      DataHandler.getStore().dispatch(refreshToken(response.data));

      return response.data?.accessToken;
    } catch ({ response }) {
      console.log({ refreshTokenError: response });
      toastAlert(response.data.message, ALERT_TYPES.error);
      handleUserSignout();
      return false;
    }
  } else {
    handleUserSignout();
    return false;
  }
};
