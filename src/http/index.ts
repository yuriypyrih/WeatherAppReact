import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: URL,
  timeoutErrorMessage: 'Request took long to complete, times up!',
});
const endpointApiKey = '&appid=' + API_KEY;

export const postRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.post(endpoint + endpointApiKey, { ...body }, {});
};

export const putRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.put(endpoint + endpointApiKey, { ...body }, {});
};

export const getRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.get(endpoint + endpointApiKey, { params });
};

export const patchRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.patch(endpoint + endpointApiKey, { ...body });
};

export const deleteRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.delete(endpoint + endpointApiKey, { params });
};
