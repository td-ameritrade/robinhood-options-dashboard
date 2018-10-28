export const SET_PRICE_INCREMENT_AMOUNT = (state, val) => {
  state.priceIncrementAmount = val;
};

export const SET_PRICE_INCREMENT_COUNT = (state, val) => {
  state.priceIncrementCount = val;
};

export const SET_ANALYSIS_SYMBOL = (state, val) => {
  state.analysisSymbol = val;

  // const symbolPosition = rootState.openposition.filter(e => e.TDAPI === val);
  // state.symbolPosition = symbolPosition;
};

export const QUOTE_DATA = (state, val) => {
  state.quoteData = val;
};
export const SET_PRICE_ARRAY = (state, val) => {
  state.priceArray = val;
};

