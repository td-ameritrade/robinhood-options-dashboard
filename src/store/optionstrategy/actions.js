import getQuote from '../../services/TDAservice';

const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));
const BS = require('../.././services/black-scholes.js');
const greeks = require('../.././services/greeks.js');

export const simulatedPrices = async ({ commit, state }) => {
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


export const simulateOptionPayoffs = ({ rootState, state }) => {
  try {
    const symbols = [];
    rootState.robinhood.openposition.forEach((position) => {
      symbols.push(JSON.parse(JSON.stringify({
        label: position.TDAPI,
        value: position,
      })));
    });

    const priceArrays = [];
    // const totalProfit = [];

    symbols.forEach((symbol) => {
      const prices = [];
      const simProfit = [];
      const simDelta = [];
      const simGamma = [];
      const simTheta = [];
      const simVega = [];
      const simPosDelta = [];
      const simPosGamma = [];
      const simPosTheta = [];
      const simPosVega = [];

      let price = symbol.underlyingprice - (state.priceIncrementCount * state.priceIncrementAmount);

      // calculate the price steps starting with the lowest (increment * -1)
      for (let i = state.priceIncrementCount * -1; i < state.priceIncrementCount; i += 1) {
        price += state.priceIncrementAmount;
        prices.push(fixFloat(price));

        // define inputs for black-scholes and greeks function calls
        let type;
        if (symbol.type === 'P') {
          type = 'put';
        } else {
          type = 'call';
        }
        const bsInputs = [
          price,
          symbol.strike_price,
          (symbol.daystoexpiration / 365),
          symbol.impVol / 100,
          0.025,
          type,
        ];

        // calculate option price at given underlying simulated price
        const optionPrice = BS.blackScholes(...bsInputs);

        // calculate profit (or loss) and add to profit array
        simProfit.push((symbol.quantity * optionPrice * 100) - symbol.costbasis);

        // calculate greek values at given simulated underlying price
        const delta = greeks.getDelta(...bsInputs);
        const gamma = greeks.getGamma(...bsInputs);
        const theta = greeks.getTheta(...bsInputs);
        const vega = greeks.getVega(...bsInputs);

        // push to respective arrays
        simDelta.push(delta);
        simGamma.push(gamma);
        simTheta.push(theta);
        simVega.push(vega);

        // calculate greek values for overall position at simulated price and add to array
        simPosDelta.push(delta * 100 * symbol.quantity);
        simPosGamma.push(gamma * 100 * symbol.quantity);
        simPosTheta.push(theta * 100 * symbol.quantity);
        simPosVega.push(vega * 100 * symbol.quantity);
      }

      // add the various arrays for simulated prices to the array for the analysis symbol
      priceArrays.push({
        id: symbol.TDAPI,
        qty: symbol.quantity,
        vol: symbol.impVol,
        dte: symbol.daystoexpiration,
        type: symbol.type,
        prices,
        simProfit,
        simDelta,
        simTheta,
        simGamma,
        simVega,
        simPosDelta,
        simPosTheta,
        simPosGamma,
        simPosVega,
      });
    });
    // priceArrays.push(totalProfit);
    console.log(priceArrays);
  // return priceArrays;
  } catch (e) {
    throw new Error(e);
  }
};
