import axios from 'axios';

export const ecomm = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export const fetcher = (url) => ecomm.get(url).then((res) => res.data);
