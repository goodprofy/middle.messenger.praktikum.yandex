import { isDefined, logError, queryStringify } from '../utils';
import { UserAlreadyInSystemError } from './Error';

const isUnauthorized = () => {
  if (window.location.pathname !== '/sign-in' && window.location.pathname !== '/sign-up') {
    window.location.href = '/sign-in';
  }
};

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

type Reason = { reason: string };
type ResponseData<T = unknown> = T;

type HTTPMethod = <T = unknown>(url: string, options: RequestOptions) => Promise<ResponseData<T>>;

export class HTTPClient {
  constructor(private baseUrl: `https://${string}`) {}

  protected get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  protected post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  protected put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  protected delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  private request: HTTPMethod = <T = unknown>(url: string, options: RequestOptions, timeout: number = 5000) => {
    const { headers = {}, method, data, isMultipart = false } = options;
    return new Promise<ResponseData<T>>((resolve, reject) => {
      if (!isDefined(method)) {
        reject(new Error('No method'));
        return;
      }

      const isGet = method === METHODS.GET;
      const fullUrl = this.baseUrl + url;

      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = true;

      xhr.open(method, isGet && data ? `${fullUrl}?${queryStringify(data)}` : fullUrl);

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

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            if (xhr.response === 'OK') {
              resolve({ ok: true } as T);
            } else {
              const parsedResponse = this.getParsedResponse<T>(xhr.responseText);
              resolve(parsedResponse);
            }
          } catch (error) {
            reject(new Error(`Error parsing response: ${error}`));
          }
        } else if (xhr.status == 401) {
          isUnauthorized();
          const err = new Error(`Unauthorized`);
          reject(err);
        } else {
          logError(xhr);
          const parsedReason = this.getParsedResponse<Reason>(xhr.responseText);
          const isUserAlreadyInSystem = parsedReason.reason === 'User already in system';
          const message = `The request failed: ${xhr.status} ${xhr.statusText} ${parsedReason.reason}`;
          let err = new Error(message);
          if (!isUserAlreadyInSystem) {
            alert(err.message);
          } else {
            err = new UserAlreadyInSystemError(message);
          }

          reject(err);
        }
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timed out'));

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
  };

  private getParsedResponse<T>(responseText: string): T {
    return JSON.parse(responseText);
  }
}
