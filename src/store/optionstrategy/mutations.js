export const SET_PRICE_INCREMENT_AMOUNT = (state, val) => {
  state.priceIncrementAmount = val;
};

export const SET_PRICE_INCREMENT_COUNT = (state, val) => {
  state.priceIncrementCount = val;
};

export const SET_VOL_OFFSET = (state, val) => {
  state.volatilityOffset = val;
};

export const SET_DTE_OFFSET = (state, val) => {
  state.dteOffset = val;
};


export const QUOTE_DATA = (state, val) => {
  state.quoteData = val;
};

export const SET_PRICE_ARRAY = (state, val) => {
  state.priceArray = val;
};


export const SET_ANALYSIS_SYMBOLS = (state, val) => {
  state.analysisSymbols = val;
};
