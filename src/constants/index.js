import {
  Login,
  Home,
  Dashboard,
  Share,
  Setting,
  StockDetaile,
} from "../modules";
import { Images } from "../theme";

const { home, share, setting } = Images;

export const ALERT_TIMEOUT = 3000;
export const DEV_ENV = "dev";
export const PROD_ENV = "prod";
export const API_LOG = process.env.REACT_APP_ENV === DEV_ENV;
export const API_TIMEOUT = 30000;

export const ERROR_MESSAGES = {
  INTERNET_ERROR: "Please connect to the working internet",
  SESSION_EXPIRED_ERROR: "Session expired, Please login again",
  SOMETHING_WRONG: "Something went wrong",
  FAILED_TO_FETCH: "Failed to fetch, try to refresh the page",
};

export const SUCCESS_MESSAGES = {
  CONTACTUS_FORM: "Form Submitted Successfully",
  LOGIN: "Login Successfully",
  LOGOUT: "Logout Successfully",
  APPOINMENT_FORM: "Request send successfully",
  CANCEL_APPOINMENT: "Appoinment cancelled successfully",
  CREATE_PATIENT: "Patient Created Successfully",
  UPDATE_PATIENT: "Patient Updated Successfully",
  DELETE_PATIENT: "Patient Deleted Successfully",
  APPOINMENT_REVIEW: "Review Submitted Successfully",
};
export const ACCESS_TYPES = {
  AUTH: "auth",
  PRIVATE: "private",
  PUBLIC: "public",
};
export const ALERT_POSITIONS = {
  topRight: "top-right",
  topLeft: "top-left",
  topCenter: "top-center",
  bottomRight: "bottom-right",
  bottomLeft: "bottom-left",
  bottomCenter: "bottom-center",
};
export const ALERT_THEMES = {
  dark: "dark",
  colored: "colored",
  light: "light",
};
export const ALERT_TYPES = {
  info: "info",
  success: "success",
  error: "error",
  warning: "warning",
  default: "default",
};
// PUBLIC ROUTES
export const HOME_ROUTE = "/";
// AUTH ROUTES
export const lOGIN_ROUTE = "/login";
// PRIVATE ROUTES
export const DASHBOARD_ROUTE = "/dashboard";

export const SHARE_ROUTE = "/share";
export const SETTING_ROUTE = "/setting";
export const STOCK_DETAILE_ROUTE = "/stock/:id";
export const TRENDING_ROUTE = "/trending";

export const PAGE_ROUTES = [
  // PUBLIC ROUTES
  {
    route: HOME_ROUTE,
    access: ACCESS_TYPES.PRIVATE,
    component: <Home />,
  },
  // AUTH ROUTES
  {
    route: lOGIN_ROUTE,
    title: "Login",
    description: "",
    access: ACCESS_TYPES.AUTH,
    component: <Login />,
  },
  // PRIVATE ROUTE
  {
    route: DASHBOARD_ROUTE,
    title: "Dashboard",
    description: "",
    access: ACCESS_TYPES.PRIVATE,
    component: <Dashboard />,
  },
  {
    route: SHARE_ROUTE,
    title: "Share",
    description: "",
    access: ACCESS_TYPES.PUBLIC,
    component: <Share />,
  },
  {
    route: SETTING_ROUTE,
    title: "Setting",
    description: "",
    access: ACCESS_TYPES.PUBLIC,
    component: <Setting />,
  },
  {
    route: STOCK_DETAILE_ROUTE,
    title: "Stock",
    description: "",
    access: ACCESS_TYPES.PUBLIC,
    component: <Home />,
  },
  {
    route: TRENDING_ROUTE,
    title: "Trending",
    description: "",
    access: ACCESS_TYPES.PUBLIC,
    component: <Home />,
  },
];
export const WEB_STRINGS = {
  ErrorPage: {
    title: "404",
    subtitle: "Oops! Page not found",
    description:
      "The page you are looking was doesn't exsist. You may have mistyped the address or the page may have been moved",
    button: "Back to Home",
  },
};

export const MENU_LIST = [
  { title: "Home", src: home, route: HOME_ROUTE },
  // { title: "Share", src: share },
  // { title: "Settings", src: setting },
];

export const stock_List = [
  {
    title: "BTCUSDT",
    name: "Cryptocurrency",
    amount: "$23,738",
    stockUpdate: "+23,6%",
    color: "green",
    id: "1",
    src: Images.bitCoin,
    chartColor: "#1ABF17",
  },

  {
    title: "Netflix",
    name: "Stock",
    amount: "$738.00",
    stockUpdate: "+23,6%",
    color: "red",
    id: "3",
    src: Images.netflix,
    chartColor: "#F12C2C",
  },
  {
    title: "BTCUSDT",
    name: "Cryptocurrency",
    amount: "$23,738",
    stockUpdate: "+23,6%",
    color: "green",
    id: "2",
    src: Images.bitCoin,
    chartColor: "#C6B200",
  },
  {
    title: "BTCUSDT",
    name: "Cryptocurrency",
    amount: "$23,738",
    stockUpdate: "+23,6%",
    color: "green",
    id: "4",
    src: Images.bitCoin,
    chartColor: "#1ABF17",
  },
  {
    title: "Netflix",
    name: "Stock",
    amount: "$738.00",
    stockUpdate: "+23,6%",
    color: "red",
    id: "5",
    src: Images.netflix,
    chartColor: "#F12C2C",
  },
  {
    title: "BTCUSDT",
    name: "Cryptocurrency",
    amount: "$23,738",
    stockUpdate: "+23,6%",
    color: "green",
    id: "6",
    src: Images.bitCoin,
    chartColor: "#C6B200",
  },
  {
    title: "Netflix",
    name: "Stock",
    amount: "$738.00",
    stockUpdate: "+23,6%",
    color: "red",
    id: "7",
    src: Images.netflix,
    chartColor: "#F12C2C",
  },
  {
    title: "Netflix",
    name: "Stock",
    amount: "$738.00",
    stockUpdate: "+23,6%",
    color: "red",
    id: "8",
    src: Images.netflix,
    chartColor: "#F12C2C",
  },
  {
    title: "Netflix",
    name: "Stock",
    amount: "$738.00",
    stockUpdate: "+23,6%",
    color: "red",
    id: "9",
    src: Images.netflix,
    chartColor: "#1ABF17",
  },
  {
    title: "BTCUSDT",
    name: "Cryptocurrency",
    amount: "$23,738",
    stockUpdate: "+23,6%",
    color: "green",
    id: "6",
    src: Images.bitCoin,
    chartColor: "#1ABF17",
  },
];
