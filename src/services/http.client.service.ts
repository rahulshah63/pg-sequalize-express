import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpException } from '@exceptions/HttpException';

class Axios {
  constructor(config: AxiosRequestConfig) {
    return axios.create(config);
  }
}

export abstract class HttpClient extends Axios {
  protected constructor(baseURL: string, headers = {}) {
    super({
      baseURL,
      timeout: 30000,
      headers,
    });

    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
    this.options = this.options.bind(this);
    this.post = this.post.bind(this);
    this.delete = this.delete.bind(this);
  }

  public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.request(config);
  }

  public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.get(url, config);
  }

  public options<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.options(url, config);
  }

  public post<T, B, R = AxiosResponse<T>>(url: string, data?: B, config?: AxiosRequestConfig): Promise<R> {
    return this.post(url, data, config);
  }

  public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.delete(url, config);
  }

  public success = <T>(response: AxiosResponse<T>): T => {
    return response.data;
  };

  public error = (error: AxiosError<Error>): never => {
    const { status, statusText } = error.response;
    const message = error.response.data?.message || statusText;
    const stack = error.response.data?.stack ?? error.stack;

    throw new HttpException(status, message, stack);
  };
}
