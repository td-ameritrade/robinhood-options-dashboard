import getQuote from '../../services/TDAservice';
import userinfo from '../../../config.js';

const Robinhood = require('robinhood');


export const getRobinhoodOptionData = async ({ dispatch }, payload) => {
  try {
    const robinhood = new Robinhood(userinfo.credentials, () => {
      robinhood.options_instrument(payload.option, (err, response, body) => {
        const combinedPositionData = Object.assign({}, payload, body);
        dispatch('processRobinhoodOptionData', combinedPositionData);
        // const data = body.results.filter(e => parseFloat(e.quantity) !== 0);
        // dispatch('processRobinhoodOptionData', data);
        // commit('OPENPOSITIONS', body);
      });
    });
  } catch (e) {
    throw new Error(e);
  }
};


export const getAccountData = async ({ commit, dispatch }) => {
  const robinhood = new Robinhood(userinfo.credentials, () => {
    try {
      robinhood.accounts((err, response, body) => {
        commit('ACCOUNT', body.results);
        dispatch('getOptionLegs');
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const getOptionLegs = async ({ commit, dispatch }) => {
  const robinhood = new Robinhood(userinfo.credentials, () => {
    try {
      robinhood.options_positions((err, response, body) => {
        // filter data to include only those positions with a quantity unequal to zero
        const data = body.results.filter(e => parseFloat(e.quantity) !== 0);
        // convert quantity to negative if short position
        commit('OPENPOSITIONS', data);
        data.forEach((position) => {
          if (position.type === 'short') {
            position.quantity *= -1.0;
          } else {
            position.quantity *= 1.0;
          }

          dispatch('getRobinhoodOptionData', position);
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const processRobinhoodOptionData = async ({ dispatch }, position) => {
  try {
    // Convert type to single letter
    if (position.type === 'call') {
      position.type = 'C';
    } else if (position.type === 'put') {
      position.type = 'P';
    }
    // console.log(position.chain_symbol);
    // Assemble string for use in TD API quote data call
    const month = position.expiration_date.substr(5, 2);
    const year = position.expiration_date.substr(2, 2);
    const day = position.expiration_date.substr(8, 2);
    position.TDAPI = `${position.chain_symbol}_${month}${day}${year}${position.type}${1 * position.strike_price}`;
    position.average_price *= 1.0;
    position.average_price = Math.abs(position.average_price / 100);
    // console.log(position.average_price);

    dispatch('getQuoteData', position);
    // console.log(data);
    // const optionPosition = Object.assign(position, option);
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


export const getQuoteData = async ({ commit }, payload) => {
  // console.log(payload);
  await getQuote(payload.TDAPI).then((res) => {
    commit('QUOTE', res);

    const positionData = Object.assign(payload, {
      costbasis: 100 * payload.quantity * payload.average_price,
      // strike: 1 * payload.legs[0].strike_price,
      // expiration: payload.legs[0].expiration_date,
      // type: payload.legs[0].option_type,
      TDAPI: payload.TDAPI,
      price: res[payload.TDAPI].lastPrice,
      delta: res[payload.TDAPI].delta,
      gamma: res[payload.TDAPI].gamma,
      vega: res[payload.TDAPI].vega,
      theta: res[payload.TDAPI].theta,
      impVol: res[payload.TDAPI].volatility,
      posDelta: res[payload.TDAPI].delta * payload.quantity * 100,
      posGamma: res[payload.TDAPI].gamma * payload.quantity * 100,
      posTheta: res[payload.TDAPI].theta * payload.quantity * 100,
      posVega: res[payload.TDAPI].vega * payload.quantity * 100,
      netliq: res[payload.TDAPI].lastPrice * payload.quantity * 100,
      // eslint-disable-next-line
      gainloss: ((res[payload.TDAPI].lastPrice * payload.quantity * 100) - (100 * payload.quantity * payload.average_price)),
      daystoexpiration: res[payload.TDAPI].daysToExpiration,
      underlyingprice: res[payload.TDAPI].underlyingPrice,
    });

    // const data = Object.assign({}, positionData);
    // console.log(positionData.costbasis);
    commit('POSITIONS', positionData);
  });
};

export const updatePositionData = async ({ commit }) => {
  await commit('UPDATE_POSITION_DATA');
};

