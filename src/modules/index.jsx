import Error from './404';
// PUBLIC ROUTES
import Home from './public/home';
// AUTH ROUTES
import Login from './auth/login/index';
import Forgot from './auth/forgot';
import EmailVerification from './auth/emailVerification';
import ResetPassword from './auth/resetPassword';
import Register from './auth/register';
import NumberVerification from './auth/numberVerification';
import Subscripton from './auth/subscription';

// PRIVATE ROUTES
import Dashboard from './private/dashboard';

import Share from './public/share';
import Setting from './public/setting';
import Trending from './public/home/trending';

import StockDetaile from './public/home/stockDetaile';

export {
  Error,
  Home,
  Login,
  Dashboard,
  Share,
  Setting,
  StockDetaile,
  Trending,
  Forgot,
  EmailVerification,
  ResetPassword,
  Register,
  NumberVerification,
  Subscripton
};
