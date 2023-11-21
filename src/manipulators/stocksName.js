import _ from 'lodash';
import { Images } from '../theme';
import moment from 'moment';
import { StockIcons } from '../constants';

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
    payload.src = StockIcons[stock?.name_id];
    payload.slug = `/stock/${stock?.name_slug}` ?? '';
    payload.slugName = stock?.name_slug;
    payload.symbol = stock?.symbol;
    payload.color =
      stock?.overall_trend?.toLowerCase() === ' strong buy'
        ? '#00D31E'
        : stock?.overall_trend?.toLowerCase() === ' buy'
        ? '#00D31E'
        : stock?.overall_trend?.toLowerCase() === ' sell'
        ? '#FF0000'
        : stock?.overall_trend?.toLowerCase() === ' strong sell'
        ? '#FF0000'
        : stock?.overall_trend?.toLowerCase() === ' neutral sell'
        ? '#DCFF00'
        : '#DCFF00';

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
      payload.changeInPercent = stock?.change_in_percent ?? 'n/a';
      payload.src = StockIcons[stock?.name_id] || Images.bitCoin;
      payload.overallTrend = stock?.overall_trend ?? '';
      payload.amount = `$${stock?.current_price ?? 'n/a'}`;
      payload.stockUpdate = `${stock?.change_in_percent ?? 'n/a'}%`;
      payload.nameId = stock?.name_id ?? '';
      payload.type = stock?.type;
      payload.slug = `/stock/${stock?.name_slug}` ?? '';
      payload.color =
        stock?.overall_trend?.toLowerCase() === ' strong buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' strong sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' neutral sell'
          ? '#DCFF00'
          : '#DCFF00';

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
      payload.changeInPercent =
        `${stock?.stocks_name?.change_in_percent}%` ?? 'n/a';
      payload.changeInPrice =
        `$${Math.abs(stock?.stocks_name?.change_in_price)}` ?? 'n/a';
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
      payload.prevPrice = `$${stock?.stocks_name?.prev_price}` ?? 'n/a';

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
      payload.src = StockIcons[stock?.stocks_name?.name_id] || Images.bitCoin;
      payload.stocks = stockGraphManipulator(stock?.stocks_name?.stocks);
      payload.color =
        stock?.stocks_name?.overall_trend?.toLowerCase() === ' strong buy'
          ? '#00D31E'
          : stock?.stocks_name?.overall_trend?.toLowerCase() === ' buy'
          ? '#00D31E'
          : stock?.stocks_name?.overall_trend?.toLowerCase() === ' sell'
          ? '#FF0000'
          : stock?.stocks_name?.overall_trend?.toLowerCase() === ' strong sell'
          ? '#FF0000'
          : stock?.stocks_name?.overall_trend?.toLowerCase() === ' neutral sell'
          ? '#DCFF00'
          : '#DCFF00';

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

      console.log(stock, 'stock');

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
        stock?.overall_trend?.toLowerCase() === ' strong buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' strong sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' neutral sell'
          ? '#DCFF00'
          : '#DCFF00';

      stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('stockGraphManipulator error --->>>> ', error);
    return [];
  }
}

export function trendGraphManipulator(list = []) {
  try {
    if (_.isEmpty(list) ?? !list?.length) {
      return [];
    }

    const stockList = [];

    for (const stock of list) {
      const payload = {};

      console.log(stock, 'trendaData');

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
      payload.src = StockIcons[stock?.name_id] || Images.bitCoin;
      payload.preClosed = stock?.timeframe;
      payload.src = StockIcons[stock?.name_id] || Images.bitCoin;

      payload.preData =
        stock?.trending_stock_data == null
          ? []
          : trendPreData(stock?.trending_stock_data);
      payload.color =
        stock?.overall_trend?.toLowerCase() === ' strong buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' buy'
          ? '#00D31E'
          : stock?.overall_trend?.toLowerCase() === ' sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' strong sell'
          ? '#FF0000'
          : stock?.overall_trend?.toLowerCase() === ' neutral sell'
          ? '#DCFF00'
          : '#DCFF00';

      stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('trendGraphManipulator error --->>>> ', error);
    return [];
  }
}

export function trendPreData(list = []) {
  try {
    if (_.isEmpty(list) ?? !list?.length) {
      return [];
    }

    const stockList = [];

    for (const stock of list) {
      const payload = {};

      console.log(stock, 'trendaData');

      payload.overallTrend = stock?.overall_trend ?? '';
      payload.date =
        moment(new Date(stock?.createdAt)).format(FORMAT) ??
        moment().format(FORMAT);

      stockList.push(payload);
    }

    return stockList;
  } catch (error) {
    console.error('trendPreData error --->>>> ', error);
    return [];
  }
}
