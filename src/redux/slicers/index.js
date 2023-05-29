import { combineReducers } from "@reduxjs/toolkit";

import general from "./general";
import user from "./user";
import subscription from "./subscription";

export default combineReducers({
  general,
  user,
  subscription,
});
