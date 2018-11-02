import getQuote from '../../services/TDAservice';
import userinfo from '../../../config.js';

const Robinhood = require('robinhood');

const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));


export const getAccountData = async ({ commit, dispatch }) => {
  const robinhood = await new Robinhood(userinfo.credentials, () => {
    try {
      robinhood.accounts((err, response, body) => {
        commit('ACCOUNT', body.results);
        dispatch('fetchOptionLegs');
      });
      robinhood.orders((err, response, body) => {
        commit('OPTION_ORDERS', body);
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const fetchOptionLegs = async ({ commit, dispatch }) => {
  const robinhood = await new Robinhood(userinfo.credentials, () => {
    try {
      robinhood.options_positions((err, response, body) => {
        // filter data to include only those positions with a quantity unequal to zero
        const data = body.results.filter(e => parseFloat(e.quantity) !== 0);
        commit('OPENPOSITIONS', data);

        // convert quantity to negative if short position
        data.forEach((position) => {
          if (position.type === 'short') {
            position.quantity *= -1.0;
          } else {
            position.quantity *= 1.0;
          }

          dispatch('fetchRobinhoodInstrumentData', position);
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const fetchRobinhoodInstrumentData = async ({ dispatch }, payload) => {
  try {
    const robinhood = await new Robinhood(userinfo.credentials, () => {
      robinhood.options_instrument(payload.option, (err, response, body) => {
        const combinedPositionData = Object.assign({}, payload, body);
        dispatch('processRobinhoodOptionData', combinedPositionData);
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const processRobinhoodOptionData = ({ dispatch }, position) => {
  try {
    // Convert type to single letter
    if (position.type === 'call') {
      position.type = 'C';
    } else if (position.type === 'put') {
      position.type = 'P';
    }

    // Assemble string for use as identifier and in TD API quote data call
    const month = position.expiration_date.substr(5, 2);
    const year = position.expiration_date.substr(2, 2);
    const day = position.expiration_date.substr(8, 2);
    position.TDAPI = `${position.chain_symbol}_${month}${day}${year}${position.type}${1 * position.strike_price}`;
    position.average_price *= 1.0;
    position.average_price = Math.abs(position.average_price / 100);

    dispatch('fetchQuoteData', position);
  } catch (e) {
    throw new Error(e);
  }
};

export const refreshQuoteData = async ({ state, commit }) => {
  state.openposition.forEach((position) => {
    getQuote(position.TDAPI).then((res) => {
      commit('QUOTE', res);
    });
  });
};


export const fetchQuoteData = async ({ commit }, payload) => {
  try {
    await getQuote(payload.TDAPI).then((res) => {
      commit('QUOTE', res);

      const positionData = Object.assign(payload, {
        costbasis: 100 * payload.quantity * payload.average_price,
        // strike: 1 * payload.legs[0].strike_price,
        // expiration: payload.legs[0].expiration_date,
        // type: payload.legs[0].option_type,
        TDAPI: payload.TDAPI,
        price: res[payload.TDAPI].mark,
        // bid: res[payload.TDAPI].bid,
        delta: res[payload.TDAPI].delta,
        gamma: res[payload.TDAPI].gamma,
        vega: res[payload.TDAPI].vega,
        theta: res[payload.TDAPI].theta,
        impVol: res[payload.TDAPI].volatility,
        posDelta: res[payload.TDAPI].delta * payload.quantity * 100,
        posGamma: res[payload.TDAPI].gamma * payload.quantity * 100,
        posTheta: res[payload.TDAPI].theta * payload.quantity * 100,
        posVega: res[payload.TDAPI].vega * payload.quantity * 100,
        netliq: res[payload.TDAPI].mark * payload.quantity * 100,
        // eslint-disable-next-line
        gainloss: ((res[payload.TDAPI].mark - payload.average_price) * 100 * payload.quantity),
        daystoexpiration: res[payload.TDAPI].daysToExpiration,
        underlyingprice: res[payload.TDAPI].underlyingPrice,
      });
      console.log(positionData);
      commit('POSITIONS', JSON.parse(JSON.stringify(positionData)));
    });
  } catch (e) {
    throw new Error(e);
  }
};

// export const updatePositionData = async ({ commit }) => {
//   await commit('UPDATE_POSITION_DATA');
// };

export const closeOptionsPosition = async ({ commit }, position) => {
  console.log(position);

  const leg = [{
    side: 'sell',
    option: position.url,
    position_effect: 'close',
    ratio_quantity: 1,
  }];

  const order = {

    price: fixFloat(position.price),
    legs: leg,
    quantity: 0,
    direction: '',
    type: 'limit',
    time_in_force: 'gfd',
    trigger: 'immediate',
    override_day_trade_checks: false,
    override_dtbp_checks: false,
    url: position.url,
  };


  if (position.quantity > 0) {
    order.quantity = position.quantity * 1.0;
    order.direction = 'credit';
  } else if (position.quantity < 0) {
    order.quantity = position.quantity * -1.0;
    order.direction = 'debit';
  }
  // order.legs.push(leg);
  console.log(order);
  commit('ORDER');
  try {
    const robinhood = await new Robinhood(userinfo.credentials, () => {
      robinhood.options_order(JSON.parse(JSON.stringify(order)), (err, response, body) => {
        // const combinedPositionData = Object.assign({}, payload, body);
        // dispatch('processRobinhoodOptionData', combinedPositionData);
        console.log(body);
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};


// const order = {
//   quantity: '5',
//   direction: 'debit',
//   price: '0.92',
//   type: 'limit',
//   account: 'https://api.robinhood.com/accounts/5PY08142/',
//   time_in_force: 'gfd',
//   trigger: 'immediate',
//   legs: [{
//     side: 'buy',
//     option: 'https://api.robinhood.com/options/instruments/f71ac9ea-e7b8-4a5b-ab16-7835ab1983b2/',
//     position_effect: 'close',
//     ratio_quantity: '1',
//   }],
//   override_day_trade_checks: false,
//   override_dtbp_checks: false,
//   ref_id: 'dc271aa9-a1eb-4c50-953c-8b15dd0ff480',
// };

// const order = {};

// if (position.quantity > 0) {
//   order.quantity = position.quantity * -1.0;
//   order.direction = 'credit';
//   order.legs[0].side = 'sell';
// } else if (position.quantity < 0) {
//   order.quantity = position.quantity * -1.0;
//   order.direction = 'debit';
//   order.legs[0].side = 'buy';
// }
// order.price = position.price;
// order.legs[0].option = position.option;

// const order = {
//   quantity: '',
//   direction: '',
//   price: position.price,
//   type: 'limit',
//   account: position.account,
//   time_in_force: 'gfd',
//   trigger: 'immediate',
//   legs: [{
//     side: '',
//     option: 'position.option,
//     position_effect: 'close',
//     ratio_quantity: '1',
//   }],
//   override_day_trade_checks: false,
//   override_dtbp_checks: false,
//   ref_id: 'dc271aa9-a1eb-4c50-953c-8b15dd0ff480',
// };


// TDAPI: "SPY_110918P267"
// account: "https://api.robinhood.com/accounts/5PY08142/"
// average_price: 4.14
// chain_id: "c277b118-58d9-4060-8dc5-a3b5898955cb"
// chain_symbol: "SPY"
// costbasis: -2070
// created_at: "2018-10-13T03:16:23.606955Z"
// daystoexpiration: 10
// delta: -0.4535253
// expiration_date: "2018-11-09"
// gainloss: -452.5000000000001
// gamma: 0.027836073
// id: "788471e8-84c3-450c-a7b5-41234a3c46b1"
// impVol: 30.557913
// intraday_average_open_price: "-414.0000"
// intraday_quantity: "5.0000"
// issue_date: "2005-01-06"
// min_ticks: {cutoff_price: "0.00", below_tick: "0.01", above_tick: "0.01"}
// netliq: -2370.0000000000005
// option: "https://api.robinhood.com/options/instruments/788471e8-84c3-450c-a7b5-41234a3c46b1/"
// pending_buy_quantity: "0.0000"
// pending_expired_quantity: "0.0000"
// pending_sell_quantity: "0.0000"
// posDelta: 226.76265
// posGamma: -13.9180365
// posTheta: 124.099545
// posVega: -92.17801000000001
// price: 5.045
// quantity: -5
// rhs_tradability: "untradable"
// state: "active"
// strike_price: "267.0000"
// theta: -0.24819909
// tradability: "tradable"
// type: "P"
// underlyingprice: 267.77
// updated_at: "2018-10-13T03:16:23.606962Z"
// url: "https://api.robinhood.com/options/instruments/788471e8-84c3-450c-a7b5-41234a3c46b1/"
// vega: 0.18435602
