import axios, { AxiosInstance } from "axios";


const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.musement.com/api/v3/",
  headers: {
    "Content-type": "application/json",
    'X-Musement-Version': '3.4.0',
    'X-Musement-Currency': 'EUR'
  },
});

export default apiClient;