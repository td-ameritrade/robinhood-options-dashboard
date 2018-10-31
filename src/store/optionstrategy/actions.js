import getQuote from '../../services/TDAservice';

const BS = require('../../services/black-scholes.js');

const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));

export const simulatedPrices = async ({ commit, state }) => {
  console.log('simpriceaction');
  const quote = await getQuote(state.analysisSymbol);
  commit('QUOTE_DATA', quote[state.analysisSymbol]);

  const prices = [];
  let price = quote[state.analysisSymbol].underlyingPrice -
  (state.priceIncrementCount * state.priceIncrementAmount);

  // calculate the price steps starting with the lowest (increment * -1)
  for (let i = state.priceIncrementCount * -1; i < state.priceIncrementCount; i += 1) {
    price += state.priceIncrementAmount;
    prices.push(fixFloat(price));
  }
  console.log(prices);

  commit('SET_PRICE_ARRAY', prices);
  // dispatch('calculateOptionPrice');
};

export const calculateOptionPrice = async ({ rootState, state }) => {
  console.log('calcpriceaction');
  try {
    const optionPrices = [];
    state.priceArray.forEach((price) => {
    // console.log(this.openPositions[0]);
      let type;
      if (state.quoteData.contractType === 'P') {
        type = 'put';
      } else {
        type = 'call';
      }
      const optionPrice = BS.blackScholes(
        price,
        state.quoteData.strikePrice,
        (state.quoteData.daystoexpiration / 365),
        state.quoteData.volatility / 100,
        0.025,
        type,
      );
      console.log(optionPrice);
      // eslint-disable-next-line
      const positionProfit = (rootState.openposition[state.analysisSymbol].quantity * optionPrice * 100) - rootState.openposition[state.analysisSymbol].costbasis;
      optionPrices.push(positionProfit);
    });
    // console.log(optionPrices);

    // eslint-disable-next-line
    // In the same way, update the series option
    // return Object.assign([], { name: 'series1' }, { data: this.positionTotal });
    this.series = [{
      data: optionPrices,
    }];
    this.options = {
      xaxis: {
        categories: optionPrices,
      },
    };
  } catch (e) {
    throw new Error(e);
  }
};


export const updateSymbolPriceArrays = async ({ dispatch, state, commit }, payload) => {
  try {
    // if (state.analysisSymbol !== payload) {
    await dispatch('simulatedPrices');
    await dispatch('calculateOptionPrice');
    console.log(payload);
    const symbols = [];
    state.analysisSymbols.forEach((symbol) => {
      symbols.push(symbol);
    });
    payload.forEach((element) => {
      symbols.push(element);
    });
    const uniqueSymbols = symbols.filter((item, index) => symbols.indexOf(item) >= index);
    await commit('SET_ANALYSIS_SYMBOLS', uniqueSymbols);
    // }
  } catch (e) {
    throw new Error(e);
  }
};

// export const changeAnalysisSymbol = async ({ dispatch, state, commit }, payload) => {
//   try {
//     // if (state.analysisSymbol !== payload) {
//     // await commit('SET_ANALYSIS_SYMBOL', payload);


//     const symbols = [];
//     state.analysisSymbols.forEach((symbol) => {
//       symbols.push(symbol);
//     });
//     const uniqueSymbols = symbols.filter((item, index) => symbols.indexOf(payload) >= index);
//     await commit('SET_ANALYSIS_SYMBOLS', uniqueSymbols);
//     await dispatch('simulatedPrices');
//     await dispatch('calculateOptionPrice');
//     // }
//   } catch (e) {
//     throw new Error(e);
//   }
// };

/* eslint-disable */
export const aggregateUnderlyingSimulations = async ({ rootState, state, commit }) => {
  try {
    const optionPrices = [];
    const filteredPositions = rootState.robinhood.openposition.filter(e => parseFloat(e.TDAPI.substr(0, 2) === state.underlyingSymbol));
    console.log(filteredPositions);
    state.priceArray.forEach((price) => {
    // console.log(this.openPositions[0]);
      let type;
      if (state.quoteData.contractType === 'P') {
        type = 'put';
      } else {
        type = 'call';
      }
      const optionPrice = BS.blackScholes(
        price,
        state.quoteData.strikePrice,
        (state.quoteData.daystoexpiration / 365),
        state.quoteData.volatility / 100,
        0.025,
        type,
      );
    });
  } catch (e) {
    throw new Error(e);
  }
};
/* eslint-enable */

