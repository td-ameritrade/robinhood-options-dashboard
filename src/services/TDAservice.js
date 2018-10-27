import Api from './API';

const getQuote = async (symbol) => {
  const res = await Api().get(`quotes?apikey=CATALYSTCAP%40AMER.OAUTHAP&symbol=${symbol}`);
  // console.log(res.data);
  return res.data;
};
// {
//   "assetType": "OPTION",
//   "symbol": "SPY_101918P275",
//   "description": "SPY Oct 19 2018 275 Put",
//   "bidPrice": 2.96,
//   "bidSize": 151,
//   "askPrice": 2.99,
//   "askSize": 20,
//   "lastPrice": 2.92,
//   "lastSize": 1,
//   "openPrice": 2.71,
//   "highPrice": 3.36,
//   "lowPrice": 1.57,
//   "closePrice": 2.8112,
//   "netChange": 0,
//   "totalVolume": 59747,
//   "quoteTimeInLong": 1539634496406,
//   "tradeTimeInLong": 1539634476300,
//   "mark": 2.975,
//   "openInterest": 162500,
//   "volatility": 23.322624,
//   "moneyIntrinsicValue": 0.6,
//   "multiplier": 100,
//   "digits": 2,
//   "strikePrice": 275,
//   "contractType": "P",
//   "underlying": "SPY",
//   "expirationDay": 19,
//   "expirationMonth": 10,
//   "expirationYear": 2018,
//   "daysToExpiration": 3,
//   "timeValue": 2.3200002,
//   "deliverables": "",
//   "delta": -0.5294602,
//   "gamma": 0.05935155,
//   "theta": -0.31210548,
//   "vega": 0.114214145,
//   "rho": -0.015670607,
//   "securityStatus": "Normal",
//   "theoreticalOptionValue": 2.9755945,
//   "underlyingPrice": 274.4,
//   "uvExpirationType": "R",
//   "exchange": "o",
//   "exchangeName": "OPR",
//   "lastTradingDay": 1539921600000,
//   "settlementType": " ",
//   "delayed": true
// }

export default getQuote;

