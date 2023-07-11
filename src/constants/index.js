import { Form } from 'antd';
import {
  Login,
  Home,
  Dashboard,
  Share,
  Setting,
  StockDetaile,
  Forgot,
  EmailVerification,
  ResetPassword,
  Register,
  NumberVerification,
  Subscripton
} from '../modules';
import { checkPasswordValidation, isEmailValid } from '../services/utils';
import { Images } from '../theme';
import PremiumSubscription from '../modules/private/premiumSubscription';

const { home, share, setting } = Images;

export const ALERT_TIMEOUT = 3000;
export const DEV_ENV = 'dev';
export const PROD_ENV = 'prod';
export const API_LOG = process.env.REACT_APP_ENV === DEV_ENV;
export const API_TIMEOUT = 60000;

export const ERROR_MESSAGES = {
  INTERNET_ERROR: 'Please connect to the working internet',
  SESSION_EXPIRED_ERROR: 'Session expired, Please login again',
  SOMETHING_WRONG: 'Something went wrong',
  FAILED_TO_FETCH: 'Failed to fetch, try to refresh the page'
};

export const USER_SUBSCRIPTION_STATUS = {
  FREE: 'FREE',
  PREMIUM_YEARLY: 'PREMIUM_YEARLY',
  PAUSED: 'PAUSED',
  CANCLED: 'CANCLED'
};

export const SUCCESS_MESSAGES = {
  CONTACTUS_FORM: 'Form Submitted Successfully',
  LOGIN: 'Login Successfully',
  LOGOUT: 'Logout Successfully',
  APPOINMENT_FORM: 'Request send successfully',
  CANCEL_APPOINMENT: 'Appoinment cancelled successfully',
  CREATE_PATIENT: 'Patient Created Successfully',
  UPDATE_PATIENT: 'Patient Updated Successfully',
  DELETE_PATIENT: 'Patient Deleted Successfully',
  APPOINMENT_REVIEW: 'Review Submitted Successfully'
};
export const ACCESS_TYPES = {
  AUTH: 'auth',
  PRIVATE: 'private',
  PUBLIC: 'public'
};
export const ALERT_POSITIONS = {
  topRight: 'top-right',
  topLeft: 'top-left',
  topCenter: 'top-center',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
  bottomCenter: 'bottom-center'
};
export const ALERT_THEMES = {
  dark: 'dark',
  colored: 'colored',
  light: 'light'
};
export const ALERT_TYPES = {
  info: 'info',
  success: 'success',
  error: 'error',
  warning: 'warning',
  default: 'default'
};
// PUBLIC ROUTES
export const HOME_ROUTE = '/';
// AUTH ROUTES
export const lOGIN_ROUTE = '/login';
export const FORGOT_ROUTE = '/forgot';
export const EMAIL_VERIFICATION_ROUTE = '/email';
export const RESET_PASSWORD_ROUTE = '/reset-password';
export const REGISTER_ROUTE = '/register';
export const NUMBER_VERIFICATION_ROUTE = '/number';
export const SUBSCRIPTION_ROUTE = '/packages';
export const PREMIUM_SUBSCRIPTION_ROUTE = '/subscription';

// PRIVATE ROUTES
export const DASHBOARD_ROUTE = '/dashboard';

export const SHARE_ROUTE = '/share';
export const SETTING_ROUTE = '/setting';
export const STOCK_DETAILE_ROUTE = '/stock/:id';
export const TRENDING_ROUTE = '/trending';

export const PAGE_ROUTES = [
  // PUBLIC ROUTES
  {
    route: HOME_ROUTE,
    access: ACCESS_TYPES.PRIVATE,
    component: <Home />
  },
  // AUTH ROUTES
  {
    route: lOGIN_ROUTE,
    title: 'Login',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Login />
  },
  {
    route: FORGOT_ROUTE,
    title: 'Forgot',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Forgot />
  },
  {
    route: EMAIL_VERIFICATION_ROUTE,
    title: 'Email Verification',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <EmailVerification />
  },
  {
    route: RESET_PASSWORD_ROUTE,
    title: 'Reset Password',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <ResetPassword />
  },
  {
    route: REGISTER_ROUTE,
    title: 'Register',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Register />
  },
  {
    route: NUMBER_VERIFICATION_ROUTE,
    title: 'Number Verification',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <NumberVerification />
  },
  {
    route: SUBSCRIPTION_ROUTE,
    title: 'Package',
    description: '',
    access: ACCESS_TYPES.AUTH,
    component: <Subscripton />
  },
  // PRIVATE ROUTE
  {
    route: DASHBOARD_ROUTE,
    title: 'Dashboard',
    description: '',
    access: ACCESS_TYPES.PRIVATE,
    component: <Dashboard />
  },
  {
    route: SHARE_ROUTE,
    title: 'Share',
    description: '',
    access: ACCESS_TYPES.PRIVATE,
    component: <Share />
  },
  {
    route: SETTING_ROUTE,
    title: 'Setting',
    description: '',
    access: ACCESS_TYPES.PRIVATE,
    component: <Setting />
  },
  {
    route: STOCK_DETAILE_ROUTE,
    title: 'Stock',
    description: '',
    access: ACCESS_TYPES.PRIVATE,
    component: <Home />
  },
  {
    route: TRENDING_ROUTE,
    title: 'Trending',
    description: '',
    access: ACCESS_TYPES.PRIVATE,
    component: <Home />
  },
  {
    route: PREMIUM_SUBSCRIPTION_ROUTE,
    access: ACCESS_TYPES.PRIVATE,
    component: <PremiumSubscription />
  }
];
export const WEB_STRINGS = {
  ErrorPage: {
    title: '404',
    subtitle: 'Oops! Page not found',
    description:
      "The page you are looking was doesn't exsist. You may have mistyped the address or the page may have been moved",
    button: 'Back to Home'
  }
};

export const MENU_LIST = [
  { title: 'Home', src: home, route: HOME_ROUTE },
  // { title: "Share", src: share },
  { title: 'Settings', src: setting, route: SETTING_ROUTE }
];

export const stock_List = [
  {
    title: 'BTCUSDT',
    name: 'Cryptocurrency',
    amount: '$23,738',
    stockUpdate: '+23,6%',
    color: 'green',
    id: '1',
    src: Images.bitCoin,
    chartColor: '#1ABF17'
  },

  {
    title: 'Netflix',
    name: 'Stock',
    amount: '$738.00',
    stockUpdate: '+23,6%',
    color: 'red',
    id: '3',
    src: Images.netflix,
    chartColor: '#F12C2C'
  },
  {
    title: 'BTCUSDT',
    name: 'Cryptocurrency',
    amount: '$23,738',
    stockUpdate: '+23,6%',
    color: 'green',
    id: '2',
    src: Images.bitCoin,
    chartColor: '#C6B200'
  },
  {
    title: 'BTCUSDT',
    name: 'Cryptocurrency',
    amount: '$23,738',
    stockUpdate: '+23,6%',
    color: 'green',
    id: '4',
    src: Images.bitCoin,
    chartColor: '#1ABF17'
  },
  {
    title: 'Netflix',
    name: 'Stock',
    amount: '$738.00',
    stockUpdate: '+23,6%',
    color: 'red',
    id: '5',
    src: Images.netflix,
    chartColor: '#F12C2C'
  },
  {
    title: 'BTCUSDT',
    name: 'Cryptocurrency',
    amount: '$23,738',
    stockUpdate: '+23,6%',
    color: 'green',
    id: '6',
    src: Images.bitCoin,
    chartColor: '#C6B200'
  },
  {
    title: 'Netflix',
    name: 'Stock',
    amount: '$738.00',
    stockUpdate: '+23,6%',
    color: 'red',
    id: '7',
    src: Images.netflix,
    chartColor: '#F12C2C'
  },
  {
    title: 'Netflix',
    name: 'Stock',
    amount: '$738.00',
    stockUpdate: '+23,6%',
    color: 'red',
    id: '8',
    src: Images.netflix,
    chartColor: '#F12C2C'
  },
  {
    title: 'Netflix',
    name: 'Stock',
    amount: '$738.00',
    stockUpdate: '+23,6%',
    color: 'red',
    id: '9',
    src: Images.netflix,
    chartColor: '#1ABF17'
  },
  {
    title: 'BTCUSDT',
    name: 'Cryptocurrency',
    amount: '$23,738',
    stockUpdate: '+23,6%',
    color: 'green',
    id: '6',
    src: Images.bitCoin,
    chartColor: '#1ABF17'
  }
];

export const validatorField = (_, value, min = 3, max = 80) => {
  if (!value || value?.length < 1) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value?.length > 0 && value?.trim() === '') {
    return Promise.reject(new Error('Cannot accept only white spaces.'));
  } else if (value?.length < min) {
    return Promise.reject(
      new Error(`Must be equal or greater than ${min} characters.`)
    );
  } else if (value?.length > max) {
    return Promise.reject(
      new Error(`Must be less than ${max + 1} characters.`)
    );
  } else {
    return Promise.resolve();
  }
};

export const EMAIL_RULE = [
  {
    validator: (_, value) => {
      if (!value || value?.length < 1) {
        return Promise.reject(new Error('Field is required'));
      } else if (value?.includes(' ')) {
        return Promise.reject(new Error('Cannot accept whitespaces.'));
      } else if (value && !isEmailValid(value)) {
        return Promise.reject(new Error('Invalid email address.'));
      } else {
        return Promise.resolve();
      }
    }
  }
];

export const numberValidatorField = (_, value) => {
  if (value === undefined) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value < 1) {
    return Promise.reject(new Error('Must be equal or greater than 1.'));
  } else if (`${value}`.toLowerCase().includes('e')) {
    return Promise.reject(new Error('Invalid Value.'));
  } else {
    return Promise.resolve();
  }
};

export const phoneValidation = (_, v, __, min = 10, max = 30) => {
  const value = v?.toString();
  if (!value || value?.length < 1) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value?.length > 0 && value?.trim() === '') {
    return Promise.reject(new Error('Cannot accept white spaces.'));
  } else if (value?.length < min) {
    return Promise.reject(
      new Error(`Must be greater than ${min - 1} characters.`)
    );
  } else if (value?.length > max) {
    return Promise.reject(
      new Error(`Must be less than ${max + 1} characters.`)
    );
  } else {
    return Promise.resolve();
  }
};

export const passwordValidation = (_, value) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value?.includes() === '') {
    return Promise.reject(new Error('Cannot accept whitespace'));
  } else if (value && !checkPasswordValidation(value)) {
    return Promise.reject(
      new Error(
        'Should contain at least 8 and maximum 30 characters , 1 Upper case, 1 Lower Case and 1 Special Character!'
      )
    );
  } else {
    return Promise.resolve();
  }
};

export const STOCK_NAME_LIST = ['ethereum'];
export const handlePassworMatch = (_, value, name) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value !== name) {
    return Promise.reject(new Error('Passwords do not match.'));
  } else {
    return Promise.resolve();
  }
};

export const handlePassworNotMatch = (_, value, name) => {
  if (!value?.length) {
    return Promise.reject(new Error('Field is required.'));
  } else if (value && value === name) {
    return Promise.reject(new Error('Passwords is same.'));
  } else if (value && value?.includes() === '') {
    return Promise.reject(new Error('Cannot accept whitespace'));
  } else if (value && !checkPasswordValidation(value)) {
    return Promise.reject(
      new Error(
        'Should contain at least 8 and maximum 30 characters , 1 Upper case, 1 Lower Case and 1 Special Character!'
      )
    );
  } else {
    return Promise.resolve();
  }
};

export const forGreen = (color) => {
  if (color === 'green') {
    return 'greenArrow';
  } else {
    return 'green';
  }
};

export const forRed = (color) => {
  if (color === 'red') {
    return 'redArrow';
  } else {
    return 'red';
  }
};

export const forYellow = (color) => {
  if (color === 'yellow') {
    return 'yellowArrow';
  } else {
    return 'yellow';
  }
};
