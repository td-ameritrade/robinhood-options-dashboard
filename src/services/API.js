import axios from 'axios';

export default() => axios.create({
  baseURL: 'https://api.tdameritrade.com/v1/marketdata/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
