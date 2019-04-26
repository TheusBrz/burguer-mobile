import axios from 'axios';

const api = axios.create({
  baseURL: 'https://burguer-backend-brz.herokuapp.com/',
});

export default api;
