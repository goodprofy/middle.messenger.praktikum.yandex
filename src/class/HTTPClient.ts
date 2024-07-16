import { isDefined } from '../utils';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

export type RequestOptions = {
  headers?: Record<string, string>;
  method?: Method;
  data?: Record<string, unknown>;
  timeout?: number;
};

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be an object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${encodeURIComponent(String(data[key]))}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type HTTPFn = (url: string, options: RequestOptions) => Promise<XMLHttpRequest>;

export class HTTPClient {
  get: HTTPFn = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: HTTPFn = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPFn = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPFn = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request: HTTPFn = (url, options, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;
    return new Promise((resolve, reject) => {
      if (!isDefined(method)) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        const headerProp = headers[key];
        if (isDefined(headerProp)) {
          xhr.setRequestHeader(key, headerProp);
        }
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
