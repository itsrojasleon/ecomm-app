import axios from 'axios';

export const ecomm = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});
