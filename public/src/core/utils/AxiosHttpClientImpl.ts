import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IHttpClient } from "./IHttpClient";

export class AxiosHttpClientImpl implements IHttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      (config: any) => {
        // Exemplo: adicionar token de autenticação
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Aguarda 3 segundos
        return response;
      },
      (error: any) => {
        console.error("HTTP Error:", error);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}
