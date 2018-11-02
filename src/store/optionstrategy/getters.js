const fixFloat = value => parseFloat(parseFloat(value).toFixed(2));
const BS = require('../.././services/black-scholes.js');
const greeks = require('../.././services/greeks.js');

export function someGetter() {
}

// compute simulated price and greek values for selected symbols
export const createSimulatedPriceArray = (state) => {
  const priceArrays = [];
  // const totalProfit = [];

  state.analysisSymbols.forEach((symbol) => {
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

    // start with the lowest number and increase to the highest with the initial being the midpoint
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
  return priceArrays;
};

export const sumArrays = (getters) => {
  console.log(getters.createSimulatedPriceArray);
};

