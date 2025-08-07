import { useAuthStore } from '@/store/useAuthStore'

import axios from 'axios'

const BASE_URL = 'http://43.201.239.29:3000'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  } else {
    delete config.headers['Authorization']
  }
  return config
})

export default axiosInstance
