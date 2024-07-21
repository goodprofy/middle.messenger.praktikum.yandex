import { isDefined, queryStringify } from '../utils';

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
  isMultipart?: boolean;
};

type Response<T> = Promise<{ response: T }>;

export class HTTPClient {
  constructor(private baseUrl: `https://${string}`) {}

  protected get<T>(url: string, options: RequestOptions): Response<T> {
    return this.request<T>(url, { ...options, method: METHODS.GET });
  }

  protected post<T>(url: string, options: RequestOptions): Response<T> {
    return this.request(url, { ...options, method: METHODS.POST });
  }

  protected put<T>(url: string, options: RequestOptions): Response<T> {
    return this.request(url, { ...options, method: METHODS.PUT });
  }

  protected delete<T>(url: string, options: RequestOptions): Response<T> {
    return this.request(url, { ...options, method: METHODS.DELETE });
  }

  private request<T>(url: string, options: RequestOptions, timeout: number = 5000): Response<T> {
    const { headers = {}, method, data, isMultipart = false } = options;
    return new Promise((resolve, reject) => {
      if (!isDefined(method)) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const fullUrl = this.baseUrl + url;

      xhr.open(method, isGet && data ? `${fullUrl}${queryStringify(data)}` : fullUrl);

      const headerKeys = Object.keys(headers);
      headerKeys.forEach((key) => {
        const headerProp = headers[key];
        if (isDefined(headerProp)) {
          xhr.setRequestHeader(key, headerProp);
        }
      });

      if (!isGet && !headerKeys.includes('Content-Type') && !isMultipart) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            if (xhr.response === 'OK') {
              resolve({ response: { ok: true } as T });
            } else {
              const parsedResponse = xhr.responseText.length > 0 ? JSON.parse(xhr.responseText) : null;
              resolve({ response: parsedResponse });
            }
          } catch (error) {
            reject(new Error(`Error parsing response: ${error}`));
          }
        } else {
          reject(new Error(`The request failed: ${xhr.status} ${xhr.statusText}`));
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));

      xhr.timeout = timeout;

      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else if (isMultipart) {
        const formData = new FormData();

        Object.entries(data).forEach(([field, value]) => {
          formData.append(field, value as Blob);
        });

        xhr.send(formData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
