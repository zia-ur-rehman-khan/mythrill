import ApiHandler from '../services/ApiHandler';
import { getCurrentAccessToken } from '../services/utils';

export const API_TIMEOUT = 300000;
export const ABORT_REQUEST_MESSAGE = 'Network failed. Aborted request.';

export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const BASE_URL = process.env.REACT_APP_BACKEND_STAGGING_URL;
// export const BASE_URL = process.env.REACT_APP_BACKEND_PROD_URL;

export const ERROR_SOMETHING_WENT_WRONG =
  'Something went wrong, Please try again later';
export const ERROR_API_NOT_FOUND = 'Api not found, Please try again later';

export const ERROR_NETWORK_NOT_AVAILABLE =
  'Please connect to the working Internet';

export const ERROR_ACCOUNT_BLOCKED =
  'Either your account is blocked or deleted';

export const ERROR_TOKEN_EXPIRE = 'Session Expired, Please login again!';

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
};

// DASHBOARD STATES

export const CONTACT_US = {
  route: '/conact-forms/fill',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

// ALL SUBSCRIPTIONS

export const GET_SUBSCRIPTIONS = {
  route: '/reports/stats',
  access_token_required: false,
  type: REQUEST_TYPE.GET
};

export const LOGIN_REQUEST = {
  route: 'users/signin',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const GOOGLE_LOGIN_REQUEST = {
  route: 'users/google',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const FACEBOOK_LOGIN_REQUEST = {
  route: 'users/facebook',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const SUBSCRIPTION_REQUEST = {
  route: 'payments/subscription',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const UPDATE_CARD_REQUEST = {
  route: 'payments/update-card',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const REMOVE_CARD_REQUEST = {
  route: 'payments/remove-card',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const PAUSE_SUBSCRIPTION_REQUEST = {
  route: 'payments/pause-subscription',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const CANCEL_SUBSCRIPTION_REQUEST = {
  route: 'payments/cancle-subscription',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const RESUME_SUBSCRIPTION_REQUEST = {
  route: 'payments/resume-subscription',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const PAYMENT_LIST_REQUEST = {
  route: 'payments/list',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const TRENDING_LIST_REQUEST = {
  route: 'stock/trending',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const REJISTER_REQUEST = {
  route: 'users/signup',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const VERIFICATION_REQUEST = {
  route: 'users/verify-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const FORGOT_PASSWORD = {
  route: 'users/forget-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const RESET_PASSWORD = {
  route: 'users/reset-password',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const LOGOUT_REQUEST = {
  route: 'users/logout',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const RESEND_VERIFICATION_REQUEST = {
  route: 'users/resend-otp',
  access_token_required: false,
  type: REQUEST_TYPE.POST
};

export const GET_STOCK_NAMES = {
  route: '/stock/all-stock-names',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const STOCK_SUBSCRIBE = {
  route: '/stock/stock-subscribe',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const STOCK_UNSUBSCRIBE = {
  route: '/stock/stock-unsubscribe',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const GET_SUBSCRIBE_STOCKS = {
  route: '/stock/all-subscribed-stocks',
  access_token_required: true,
  type: REQUEST_TYPE.GET
};

export const CHANGE_USER_PASSWORD = {
  route: '/users/change-password',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const CHANGE_USER_Info = {
  route: '/users/update-user-profile',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};

export const CHANGE_USER_AVATAR = {
  route: '/upload/avatar',
  access_token_required: true,
  type: REQUEST_TYPE.POST
};
export const callRequest = async (
  url,
  data,
  parameter,
  query,
  header = {},
  baseURL = BASE_URL
) => {
  let _header = header;
  if (url.access_token_required) {
    const _access_token = getCurrentAccessToken();
    console.log('accc', _access_token);
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`
        }
      };
    }
  }

  let _url =
    parameter && parameter !== null ? `${url.route}/${parameter}` : url.route;
  if (query && query !== null) {
    _url = `${_url}?${query}`;
  }
  let response = await ApiHandler(url.type, _url, data, _header, baseURL);
  console.log('response', response);
  return response;
};
