import { HTTPClient, type RequestOptions } from '../class';

const http = new HTTPClient();

export function useFetch(url: string, options: RequestOptions) {
  return http.request(url, options);
}
