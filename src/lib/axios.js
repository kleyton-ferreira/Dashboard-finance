import { LOCAL_STORAGE_ACESS_TOKEN_KEY } from '@/constants/local-storage'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://fullstackclub-finance-dashboard-api.onrender.com/api',
})

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACESS_TOKEN_KEY)
  if (!accessToken) {
    return request
  }

  request.headers.Authorization = `Bearer ${accessToken}`
  return request
})
