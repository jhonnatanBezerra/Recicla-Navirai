import axios from 'axios';


const api = axios.create({
  baseURL: 'https://reciclanavirai-api.herokuapp.com/api',
})

export default api;