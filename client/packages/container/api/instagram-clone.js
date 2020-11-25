import axios from 'axios';

const instagramClone = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export { instagramClone };
