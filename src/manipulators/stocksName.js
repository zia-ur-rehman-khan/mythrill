import _ from 'lodash';
import { Images } from '../theme';
import moment from 'moment';

const FORMAT = 'YYYY-MM-DDTHH:mm:ss';

export function stocksdataManipulatorObject(stock = {}) {
  // console.log(stock, 'stock');
  try {
    if (_.isEmpty(stock)) return {};

    const payload = {};

    payload.changeInPercent = stock?.change_in_percent ?? 'n/a';
    payload.changeInPrice = stock?.change_in_price ?? 'n/a';
    payload.coin = stock?.coin ?? '';
    payload.currentPrice = stock?.current_price ?? 'n/a';
    payload.date =
      moment(new Date(stock?.createdAt)).format(FORMAT) ??
      moment().format(FORMAT);
    payload.updateDate = moment(new Date(stock?.updatedAt)).fromNow();

    payload.fullName = stock?.fullName ?? '';
    payload.fearGreedIndex = stock?.fear_greed_index ?? 'n/a';
    payload.nameId = stock?.name_id ?? '';
    payload.overallTrend = stock?.overall_trend ?? '';
    payload.prevPrice = stock?.prev_price ?? 'n/a';

    payload.stockId = stock.id ?? '';
    payload.stocks = stockGraphManipulator(stock?.stocks);
    payload.title = stock?.name;
    payload.amount = `$${stock?.current_price ?? 'n/a'}`;
    payload.stockUpdate = `${stock?.change_in_percent ?? 'n/a'}%`;
    payload.nameId = stock?.name_id ?? '';
    payload.type = stock?.type;
    payload.src = Images.bitCoin;
    payload.slug = `/stock/${stock?.name_slug}` ?? '';
    payload.slugName = stock?.name_slug;
    payload.symbol = stock?.symbol;
    payload.color =
      stock?.change_in_percent === 0
        ? 'yellow'
        : stock?.change_in_percent > 0
        ? 'green'
        : 'red';

    return payload;
  } catch (error) {
    console.error('singleStockNameManipulator error --->>> ', error);
  }
}

export function stocksdataManipulator(list = []) {
  try {
    if (_.isEmpty(list) ?? !list?.length) {
      return [];
    }

    const stockList = [];
    for (const stock of list) {
      const payload = {};
      payload.stockId = stock.id ?? '';
      payload.subscribe = stock?.stock_subscribe?.length ?? 0;
      payload.title = stock?.name;
      payload.amount = `$${stock?.current_price ?? 'n/a'}`;
      payload.stockUpdate = `${stock?.change_in_percent ?? 'n/a'}%`;
      payload.nameId = stock?.name_id ?? '';
      payload.type = stock?.type;
      payload.slug = `/stock/${stock?.name_slug}` ?? '';
      payload.color =
        stock?.change_in_percent === 0
          ? 'yellow'
          : stock?.stocks_name?.change_in_percent > 0
          ? 'green'
          : 'red';

      payload && stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('stocksdataManipulator error --->>>> ', error);
    return [];
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
      payload.stockSubscribe = stock?.stock_subscribe?.length ?? 0;
      payload.changeInPercent = stock?.stocks_name?.change_in_percent ?? 'n/a';
      payload.changeInPrice = stock?.stocks_name?.change_in_price ?? 'n/a';
      payload.frequency = stock?.stocks_name?.Frequency;
      payload.favourite = stock?.is_favourite;
      payload.coin = stock?.stocks_name?.coin ?? '';
      payload.currentPrice = stock?.stocks_name?.current_price ?? 'n/a';
      payload.date =
        moment(new Date(stock?.stocks_name?.createdAt)).format(FORMAT) ??
        moment().format(FORMAT);
      payload.fullName = stock?.stocks_name?.fullName ?? '';
      payload.fearGreedIndex = stock?.stocks_name?.fear_greed_index ?? 'n/a';
      payload.nameId = stock?.stocks_name?.name_id ?? '';
      payload.overallTrend = stock?.stocks_name?.overall_trend ?? '';
      payload.prevPrice = stock?.stocks_name?.prev_price ?? 'n/a';

      payload.title = stock?.stocks_name?.name ?? '';
      payload.stockId = stock?.stocks_name.id ?? '';
      payload.type = stock?.stocks_name?.type;
      payload.slug = `/stock/${stock?.stocks_name?.name_slug}` ?? '';
      payload.slugName = stock?.stocks_name?.name_slug;
      payload.symbol = stock?.stocks_name?.symbol;
      payload.id = stock?.stocks_name?.id ?? '';
      payload.amount = `$${stock?.stocks_name?.current_price ?? 'n/a'}`;
      payload.currentPrice = stock?.stocks_name?.current_price ?? 'n/a';
      payload.stockUpdate = `${
        stock?.stocks_name?.change_in_percent ?? 'n/a'
      }%`;
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

      payload.title = stock?.name;
      payload.changeInPercent = stock?.change_in_percent ?? 'n/a';
      payload.changeInPrice = stock?.change_in_price ?? 'n/a';
      payload.coin = stock?.coin ?? '';
      payload.currentPrice = stock?.current_price ?? 'n/a';
      payload.date =
        moment(new Date(stock?.createdAt)).format(FORMAT) ??
        moment().format(FORMAT);
      payload.updateDate = moment(new Date(stock?.updatedAt)).fromNow();
      payload.fullName = stock?.fullName ?? '';
      payload.fearGreedIndex = stock?.fear_greed_index ?? 'n/a';
      payload.nameId = stock?.name_id ?? '';
      payload.overallTrend = stock?.overall_trend ?? '';
      payload.prevPrice = stock?.prev_price ?? 'n/a';
      payload.color =
        stock?.change_in_percent === 0
          ? 'yellow'
          : stock?.change_in_percent > 0
          ? 'green'
          : 'red';

      stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('stockGraphManipulator error --->>>> ', error);
    return [];
  }
}

// export function packagesManipulator(subscription = {}) {
//   // console.log(stock, 'stock');
//   try {
//     if (_.isEmpty(subscription)) return {};

//     const payload = {};

//     payload.basic = {
//       options: subscription?.basic,
//       title: 'Basic',
//       stock: '10'
//     };

//     payload.advance = {
//       options: subscription?.advance,
//       title: 'Advanced',
//       stock: '25'
//     };

//     payload.platinum = {
//       options: subscription?.platinum,
//       title: 'Platinum',
//       stock: '50'
//     };

//     payload.platinum = {
//       options: subscription?.professional,
//       title: 'Professional Tier',
//       stock: '100'
//     };

//     return payload;
//   } catch (error) {
//     console.error('singleStockNameManipulator error --->>> ', error);
//   }
// }
