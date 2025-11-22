// lib/apiCaller.ts
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Base URL for the API
export const BASE_URL = "http://localhost:8000/api";
// export const BASE_URL = 'https://codux.kababeats.com/api';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Handle FormData
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Gérer FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Vous pouvez gérer les erreurs globales ici si besoin
    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async <T>(
  url: string,
  params: Record<string, any> = {}
): Promise<T> => {
  try {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Generic POST request
export const post = async <T>(
  url: string,
  data: Record<string, any> | FormData = {}
): Promise<T> => {
  try {
    const response = await apiClient.post<T>(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Generic PUT request
export const put = async <T>(
  url: string,
  data: Record<string, any> | FormData = {}
): Promise<T> => {
  try {
    const response = await apiClient.put<T>(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Generic DELETE request
export const remove = async (url: string): Promise<void> => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default apiClient;