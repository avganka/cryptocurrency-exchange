import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface Options<TypeParams, TypePayload, TypeHeaders> {
  params?: TypeParams | null;
  payload?: TypePayload | null;
  customHeaders?: TypeHeaders | null;
}

export class APIService<
  Payload = Record<string, unknown> | string | FormData,
  Headers = Record<string, unknown>,
  Params = Record<string, unknown>
> {
  host: string;
  apiKey: string;

  constructor() {
    this.host = 'api.changenow.io';
    this.apiKey = import.meta.env.API_KEY || '';
  }

  protected constructURL(path: string): string {
    return `https://${this.host}/${path}`;
  }

  protected execute = async (
    path: string,
    method: Method = 'GET',
    options: Options<Params, Payload, Headers> = {
      params: null,
      payload: null,
      customHeaders: null
    }
  ): Promise<AxiosResponse> => {
    const headers: {
      'Content-Type': string;
    } = { 'Content-Type': 'application/json', ...options.customHeaders };

    const config: AxiosRequestConfig = {
      headers: headers
    };

    if (options.params) {
      config.params = options.params;
    }

    const url = this.constructURL(path);
    const response = await axios({ method, url, data: options.payload, ...config });

    return response;
  };
}
