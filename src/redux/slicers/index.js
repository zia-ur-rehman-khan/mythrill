import { combineReducers } from "@reduxjs/toolkit";

import general from "./general";
import user from "./user";
import subscription from "./subscription";
import stocks from "./stocks";

export default combineReducers({
	general,
	user,
	subscription,
	stocks,
});
