import axios from 'axios';


const api = axios.create({
  baseURL: 'https://reciclanavirai.herokuapp.com/api',
})

export default api;