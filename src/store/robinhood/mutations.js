export const POSITIONS = (state, payload) => {
  // state.positions = Object.assign(state.positions, payload);
  state.positions = Object.assign(state.positions, payload);
  // state.openpositions.push(payload);
  state.openposition.push(payload);
  Object.assign({}, state.openpositions, payload);
};

export const OPENPOSITIONS = (state, payload) => {
  // state.positions = Object.assign({}, state.openpositions, payload);
  // state.openposition.push(payload);
  state.openposition = [];

  state.openpositions = Object.assign(state.openpositions, payload);
};

export const QUOTE = (state, payload) => {
  // const temp = Object.assign({}, state.quotes);
  // state.quotes.push(payload);
  state.quotes = Object.assign({}, state.quotes, payload);
};

export const ORDER = (state, payload) => {
  // const temp = Object.assign({}, state.quotes);
  // state.quotes.push(payload);
  state.order = (payload);
};

export const OPTION_ORDERS = (state, payload) => {
  // const temp = Object.assign({}, state.quotes);
  // state.quotes.push(payload);
  state.orders = payload;
  // state.orders = Object.assign({}, state.orders, payload);
};

export const UPDATE_POSITION_DATA = (state) => {
  state.openpositions.forEach((position) => {
    const positionData = Object.assign(position, {
      price: state.quotes[position.TDAPI].lastPrice,
      delta: state.quotes[position.TDAPI].delta,
      gamma: state.quotes[position.TDAPI].gamma,
      vega: state.quotes[position.TDAPI].vega,
      theta: state.quotes[position.TDAPI].theta,
      impVol: state.quotes[position.TDAPI].volatility,
      posDelta: state.quotes[position.TDAPI].delta * position.quantity * 100,
      posGamma: state.quotes[position.TDAPI].gamma * position.quantity * 100,
      posTheta: state.quotes[position.TDAPI].theta * position.quantity * 100,
      posVega: state.quotes[position.TDAPI].vega * position.quantity * 100,
      netliq: state.quotes[position.TDAPI].lastPrice * position.quantity * 100,
      // eslint-disable-next-line
      gainloss: ((state.quotes[position.TDAPI].lastPrice * position.quantity * 100) - (position.costbasis)),
      daystoexpiration: state.quotes[position.TDAPI].daysToExpiration,
      underlyingprice: state.quotes[position.TDAPI].underlyingPrice,
    });
    state.openpositions = Object.assign(state.openpositions, positionData);
  });
};

export const CLEAR_POSITIONS = (state) => {
  state.openpositions = [];
};

export const TOGGLE_DARK_MODE = (state, val) => {
  state.darkMode = val;
};

// export const OPENPOSITION = async (state, payload) => {
//   state.openpositions = payload.results.filter(e => parseFloat(e.quantity) > 0);
//   // console.log(Object.keys(state.openpositions.legs));
//   // if (position.legs.length === 1) {
//   //   Object.assign(state.positions, { state.positions.legs[0] })
//   // }
//   state.openpositions.forEach((position) => {
//     // Convert quantity to reflect long or short
//     if (position.legs[0].position_type === 'short') {
//       position.quantity *= -1.0;
//     } else {
//       position.quantity *= 1.0;
//     }


//     // Convert type to single letter
//     if (position.legs[0].option_type === 'call') {
//       position.legs[0].option_type = 'C';
//     } else if (position.legs[0].option_type === 'put') {
//       position.legs[0].option_type = 'P';
//     }

//     // Assemble string for use in TD API quote data call
//     const month = position.legs[0].expiration_date.substr(5, 2);
//     const year = position.legs[0].expiration_date.substr(2, 2);
//     const day = position.legs[0].expiration_date.substr(8, 2);

//     // Average opening price to per contract basis
//     position.average_open_price /= 100.00;

//     const option = Object.assign(position, {
//       costbasis: ((100 * position.quantity * position.average_open_price)),
//       strike: (1 * position.legs[0].strike_price),
//       expiration: position.legs[0].expiration_date,
//       type: position.legs[0].option_type,
//       TDAPI: TdaSymbol,
//       price: '',
//       delta: '',
//       gamma: '',
//       vega: '',
//       theta: '',
//       impVol: '',
//       netliq: '',
//       gainloss: '',
//       daystoexpiration: '',
//       underlyingprice: '',
//     });

//     // const optionPosition = Object.assign(position, option);
//     state.openpositions = Object.assign(state.openpositions, option);
//   });
// };


export const ACCOUNT = (state, payload) => {
  state.account = payload;
};
