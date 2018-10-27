// eslint-disable-next-line
export const openPositions = state => state.openpositions.filter(e => parseFloat(e.quantity) != 0);

export const uniqueSymbols = (state) => {
  const symbols = [];
  state.openpositions.forEach((position) => {
    symbols.push(position.symbol);
  });
  return symbols.filter((item, index) => symbols.indexOf(item) >= index);
};

export const positionTotal = (state) => {
  const symbols = [];
  state.openposition.forEach((position) => {
    symbols.push(position.chain_symbol);
  });
  const unique = symbols.filter((item, index) => symbols.indexOf(item) >= index);
  const positions = [];
  unique.forEach((sym) => {
    const positionTotals = {
      chain_symbol: sym,
      delta: 0,
      gamma: 0,
      theta: 0,
      vega: 0,
      netliq: 0,
      gainloss: 0,
      costbasis: 0,
    };
/* eslint-disable */
    state.openposition.forEach((position) => {
      // console.log(position.chain_symbol,positionTotals.chain_symbol )
      if (position.chain_symbol === positionTotals.chain_symbol) {
        (positionTotals.delta += position.posDelta);
        positionTotals.gamma += position.posGamma;
        positionTotals.theta += position.posTheta;
        positionTotals.vega += position.posVega;
        positionTotals.netliq += position.netliq;
        positionTotals.gainloss += position.gainloss;
        positionTotals.costbasis += position.costbasis;
      }
    });
    /* eslint-enable */

    positions.push(positionTotals);
  });
  return positions;
};

