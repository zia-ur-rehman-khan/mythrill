import Error from './404';
// PUBLIC ROUTES
import Home from './private/home';
// AUTH ROUTES
import Login from './auth/login/index';
import Forgot from './auth/forgot';
import EmailVerification from './auth/emailVerification';
import ResetPassword from './auth/resetPassword';
import Register from './auth/register';
import NumberVerification from './auth/numberVerification';
import Subscripton from './auth/subscription';

// PRIVATE ROUTES
import Dashboard from './public/dashboard';

import Share from './private/share';
import Setting from './private/setting';
import Trending from './private/home/trending';

import StockDetaile from './private/home/stockDetaile';

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
