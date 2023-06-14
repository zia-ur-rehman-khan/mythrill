// @flow
import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

const GeneralReducer = createSlice({
	name: "stocks",
	initialState: {
		stocks: [],
	},
	reducers: {
		setStocksListAction(state, action) {
			state.stocks = action.payload;
		},
	},
});

export const { setStocksListAction } = GeneralReducer.actions;

export default GeneralReducer.reducer;
