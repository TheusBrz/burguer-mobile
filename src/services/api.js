import axios from 'axios';

const api = axios.create({
  baseURL: 'https://developer.datafarm.com.br/api',
});

export default api;
