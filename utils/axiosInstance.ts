import axios from 'axios'

const BASE_URL = 'https://kleague-restaurant-api.gaanii.dev'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosInstance
