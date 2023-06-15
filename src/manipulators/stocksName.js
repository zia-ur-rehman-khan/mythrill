import _ from "lodash";
import { Images } from "../theme";
import moment from "moment";

const FORMAT = "YYYY-MM-DDTHH:mm:ss";

export function singleStockNameManipulator(stock = {}) {
	try {
		if (_.isEmpty(stock)) return {};

		const payload = {};

		payload.title = stock?.fullName ?? "";
		payload.type = "Cryptocurrency";
		payload.slug = stock?.name_id ?? "";
		payload.nameId = stock?.name_id ?? "";
		payload.id = stock?.id ?? "";
		payload.amount = `$${stock?.current_price}`;
		payload.stockUpdate = `${stock?.change_in_percent}%`;
		payload.overallTrend = stock?.overall_trend ?? "";
		payload.src = Images.bitCoin;
		payload.changeInPrice = stock?.change_in_price ?? 0;
		payload.changeInPercent = stock?.change_in_percent ?? 0;
		payload.prevPrice = stock?.prev_price ?? 0;
		payload.color =
			stock?.change_in_percent === 0
				? "yellow"
				: stock?.change_in_percent > 0
				? "green"
				: "red";
		payload.fearGreedIndex = stock?.fear_greed_index ?? 0;

		return payload;
	} catch (error) {
		console.error("singleStockNameManipulator error --->>> ", error);
	}
}

export function stocksNameManipulator(list = []) {
	try {
		if (_.isEmpty(list) ?? !list?.length) {
			return [];
		}

		const stockList = [];
		for (const stock of list) {
			const payload = {};

			payload.title = stock?.name ?? "";
			payload.type = "Cryptocurrency";
			payload.slug = stock?.name_id ?? "";
			payload.id = stock?.id ?? "";
			payload.amount = `$${stock?.current_price}`;
			payload.stockUpdate = `${stock?.change_in_percent}%`;
			payload.src = Images.bitCoin;
			payload.color =
				stock?.change_in_percent === 0
					? "yellow"
					: stock?.change_in_percent > 0
					? "green"
					: "red";

			payload && stockList.push(payload);
		}

		return stockList;
	} catch (error) {
		console.error("stocksNameManipulator error --->>>> ", error);
		return [];
	}
}

export function stockListManipulator(list = []) {
	try {
		if (_.isEmpty(list) ?? !list?.length) {
			return [];
		}

		const stockList = [];

		for (const stock of list) {
			const payload = {};

			payload.changeInPercent = stock?.change_in_percent ?? 0;
			payload.changeInPrice = stock?.change_in_price ?? 0;
			payload.coin = stock?.coin ?? "";
			payload.currentPrice = stock?.current_price ?? 0;
			payload.date =
				moment(new Date(stock?.date_time?.seconds * 1000)).format(FORMAT) ??
				moment().format(FORMAT);
			payload.fullName = stock?.fullName ?? "";
			payload.fearGreedIndex = stock?.fear_greed_index ?? 0;
			payload.nameId = stock?.name_id ?? "";
			payload.overallTrend = stock?.overall_trend ?? "";
			payload.prevPrice = stock?.prev_price ?? 0;

			stockList.push(payload);
		}

		console.log({ stockList });

		return stockList;
	} catch (error) {
		console.error("stockListManipulator error --->>>> ", error);
		return [];
	}
}

// STOCK NAME OBJECT

// {
//   title: "BTCUSDT",
//   name: "Cryptocurrency",
//   amount: "$23,738",
//   stockUpdate: "+23,6%",
//   color: "green",
//   id: "1",
//   src: Images.bitCoin,
//   chartColor: "#1ABF17",
// },

// change_in_percent
// :
// -465
// change_in_price
// :
// 0
// coin
// :
// "ETH"
// current_price
// :
// 5
// date_time
// :
// it {seconds: 1686673522, nanoseconds: 345000000}
// fear_greed_index
// :
// 0
// fullName
// :
// "Ethereum"
// name_id
// :
// "ethereum"
// overall_trend
// :
// "Arvel"
// prev_price
// :
// 8
