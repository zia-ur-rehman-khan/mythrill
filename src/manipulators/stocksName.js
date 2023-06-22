import _ from 'lodash';
import { Images } from '../theme';
import moment from 'moment';

const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

// export function singleStockNameManipulator(stock = {}) {
//   try {
//     if (_.isEmpty(stock)) return {};

//     const payload = {};

//     payload.title = stock?.fullName ?? '';
//     payload.type = 'Cryptocurrency';
//     payload.slug = stock?.name_id ?? '';
//     payload.nameId = stock?.name_id ?? '';
//     payload.id = stock?.id ?? '';
//     payload.amount = `$${stock?.current_price}`;
//     payload.stockUpdate = `${stock?.change_in_percent}%`;
//     payload.overallTrend = stock?.overall_trend ?? '';
//     payload.src = Images.bitCoin;
//     payload.changeInPrice = stock?.change_in_price ?? 0;
//     payload.changeInPercent = stock?.change_in_percent ?? 0;
//     payload.prevPrice = stock?.prev_price ?? 0;
//     payload.currentPrice = stock?.current_price ?? 0;
//     payload.color =
//       stock?.change_in_percent === 0
//         ? 'yellow'
//         : stock?.change_in_percent > 0
//         ? 'green'
//         : 'red';
//     payload.fearGreedIndex = stock?.fear_greed_index ?? 0;

//     return payload;
//   } catch (error) {
//     console.error('singleStockNameManipulator error --->>> ', error);
//   }
// }

export function stocksNameManipulator(list = []) {
  try {
    if (_.isEmpty(list) ?? !list?.length) {
      return [];
    }

    const stockList = [];
    for (const stock of list) {
      const payload = {};

      payload.changeInPercent = stock?.stocks_name?.change_in_percent ?? 0;
      payload.changeInPrice = stock?.stocks_name?.change_in_price ?? 0;
      payload.coin = stock?.stocks_name?.coin ?? '';
      payload.currentPrice = stock?.stocks_name?.current_price ?? 0;
      payload.date =
        moment(new Date(stock?.stocks_name?.createdAt)).format(FORMAT) ??
        moment().format(FORMAT);
      payload.fullName = stock?.stocks_name?.fullName ?? '';
      payload.fearGreedIndex = stock?.stocks_name?.fear_greed_index ?? 0;
      payload.nameId = stock?.stocks_name?.name_id ?? '';
      payload.overallTrend = stock?.stocks_name?.overall_trend ?? '';
      payload.prevPrice = stock?.stocks_name?.prev_price ?? 0;

      payload.title = stock?.stocks_name?.name ?? '';
      payload.type = stock?.stocks_name?.type;
      payload.slug = `/stock/${stock?.stocks_name?.name_slug}` ?? '';
      payload.id = stock?.stocks_name?.id ?? '';
      payload.amount = `$${stock?.stocks_name?.current_price}`;
      payload.currentPrice = stock?.stocks_name?.current_price ?? 0;
      payload.stockUpdate = `${stock?.stocks_name?.change_in_percent}%`;
      payload.src = Images.bitCoin;
      payload.stocks = stockGraphManipulator(stock?.stocks_name?.stocks);
      payload.color =
        stock?.stocks_name?.change_in_percent === 0
          ? 'yellow'
          : stock?.stocks_name?.change_in_percent > 0
          ? 'green'
          : 'red';

      payload && stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('stocksNameManipulator error --->>>> ', error);
    return [];
  }
}

export function stockGraphManipulator(list = []) {
  try {
    if (_.isEmpty(list) ?? !list?.length) {
      return [];
    }

    const stockList = [];

    for (const stock of list) {
      const payload = {};

      payload.changeInPercent = stock?.change_in_percent ?? 0;
      payload.changeInPrice = stock?.change_in_price ?? 0;
      payload.coin = stock?.coin ?? '';
      payload.currentPrice = stock?.current_price ?? 0;
      payload.date =
        moment(new Date(stock?.createdAt)).format(FORMAT) ??
        moment().format(FORMAT);
      payload.fullName = stock?.fullName ?? '';
      payload.fearGreedIndex = stock?.fear_greed_index ?? 0;
      payload.nameId = stock?.name_id ?? '';
      payload.overallTrend = stock?.overall_trend ?? '';
      payload.prevPrice = stock?.prev_price ?? 0;

      stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('stockListManipulator error --->>>> ', error);
    return [];
  }
}
