import ApiHandler from "../services/ApiHandler";
import { getCurrentAccessToken } from "../services/utils";

export const API_TIMEOUT = 30000;
export const ABORT_REQUEST_MESSAGE = "Network failed. Aborted request.";

export const BASE_URL = "https://5b3b-110-39-172-42.ngrok-free.app";
// export const BASE_URL = process.env.REACT_APP_BACKEND_DEV_URL;
// export const BASE_URL = process.env.REACT_APP_BACKEND_STAGGING_URL;
// export const BASE_URL = process.env.REACT_APP_BACKEND_PROD_URL;

export const ERROR_SOMETHING_WENT_WRONG =
  "Something went wrong, Please try again later";
export const ERROR_API_NOT_FOUND = "Api not found, Please try again later";

export const ERROR_NETWORK_NOT_AVAILABLE =
  "Please connect to the working Internet";

export const ERROR_ACCOUNT_BLOCKED =
  "Either your account is blocked or deleted";

export const ERROR_TOKEN_EXPIRE = "Session Expired, Please login again!";

export const REQUEST_TYPE = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

// DASHBOARD STATES

export const CONTACT_US = {
  route: "/conact-forms/fill",
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

// ALL SUBSCRIPTIONS

export const GET_SUBSCRIPTIONS = {
  route: "/api/v1/reports/stats",
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const LOGIN_REQUEST = {
  route: "users/signin",
  access_token_required: false,
  type: REQUEST_TYPE.POST,
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
    console.log("accc", _access_token);
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  let _url =
    parameter && parameter !== null ? `${url.route}/${parameter}` : url.route;
  if (query && query !== null) {
    _url = `${_url}?${query}`;
  }
  let response = await ApiHandler(url.type, _url, data, _header, baseURL);
  console.log("response", response);
  return response;
};
