import axios from "axios";
const axiosInstance = axios.create(  {
  baseURL:'//localhost:3000',
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
export {
  axiosInstance
}