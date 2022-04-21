import {RequestProvider} from 'react-request-hook';
import axios from 'axios';
 
// More info about configuration: https://github.com/axios/axios#axioscreateconfig
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5020/',
});