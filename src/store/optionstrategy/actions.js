import getQuote from '../../services/TDAservice';

const BS = require('../../services/black-scholes.js');

const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));

export const simulatedPrices = async ({ commit, state }) => {
  const quote = await getQuote(state.analysisSymbol);
  commit('QUOTE_DATA', quote[state.analysisSymbol]);


  const prices = [];
  let priceinc = quote[state.analysisSymbol].underlyingPrice -
  (state.priceIncrementCount * state.priceIncrementAmount);

  for (let i = state.priceIncrementCount * -1; i < state.priceIncrementCount; i += 1) {
    priceinc += state.priceIncrementAmount;
    prices.push(fixFloat(priceinc));
  }
  commit('SET_PRICE_ARRAY', prices);
  // console.log(prices);
};

export const calculateOptionPrice = async () => {
  const prices = [];

  let priceinc = this.openPositions[0].underlyingprice - (this.length * this.increment);

  for (let i = this.length * -1; i < this.length; i += 1) {
    priceinc += this.increment;
    prices.push(priceinc);
  }
  // console.log(prices);
  const optionPrices = [];
  prices.forEach((price) => {
    // console.log(this.openPositions[0]);
    let type;
    if (this.openPositions[0].type === 'P') {
      type = 'put';
    } else {
      type = 'call';
    }
    const optionPrice = BS.blackScholes(
      price,
      this.openPositions[0].strike,
      (this.openPositions[0].daystoexpiration / 365),
      this.openPositions[0].impVol / 100,
      0.025,
      type,
    );
      // eslint-disable-next-line
      const positionProfit = (this.openPositions[0].quantity * optionPrice * 100) - this.openPositions[0].costbasis;
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
      categories: prices,
    },
  };
};
