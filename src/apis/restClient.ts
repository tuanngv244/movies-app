import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import get from 'lodash/get';

type RequestConfig = AxiosRequestConfig & {
  showLoading?: boolean;
};

type HttpRequestCallback = {
  onShowLoading?: () => void;
  onHideLoading?: () => void;
  onCatchUnauthorizedError?: () => void;
  onSetAuthorization?: (prevToken: string) => void;
  onCatchForbidden?: () => void;
};

type ErrorResponse = AxiosError & {
  config: Pick<RequestConfig, 'showLoading'>;
};

export class RestClient {
  readonly instance: AxiosInstance;
  private _isAttachedAuthToken = false;
  private _callbacks?: HttpRequestCallback;

  constructor(baseURL: string, config?: RequestConfig) {
    this.instance = axios.create({
      baseURL,
      timeout: 60000,
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: 'application/json, text/plain, */*',
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      // },
      ...config,
    });
  }

  private _handleError(error: AxiosError<{ error?: { message: string; errorData: string } }>) {
    return Promise.reject({
      systemMessage: error.message,
      code: error.response?.status,
      isForbidden: error.response?.status === 403,
      description: get(error, 'response.data.error.errorData'),
      message: 'error message',
    });
  }

  initRequest() {
    let requestCount = 0;
    const decreaseRequestCount = () => {
      requestCount -= 1;
      if (requestCount === 0) {
        this._callbacks?.onHideLoading && this._callbacks.onHideLoading();
      }
    };

    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        if (config?.showLoading) {
          requestCount += 1;
          this._callbacks?.onShowLoading && this._callbacks.onShowLoading();
        }
        return config;
      },
      (error: ErrorResponse) => {
        if (error?.config?.showLoading) {
          decreaseRequestCount();
        }
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (res: any) => {
        if (res.config?.showLoading) {
          decreaseRequestCount();
        }
        return res;
      },
      (error: ErrorResponse) => {
        if (error.response?.status === 401) {
          this._callbacks?.onCatchUnauthorizedError && this._callbacks.onCatchUnauthorizedError();
          this.deleteAuthorization();
        }
        if (error.response?.status === 403) {
          this._callbacks?.onCatchForbidden && this._callbacks.onCatchForbidden();
        }
        if (error?.config?.showLoading) {
          decreaseRequestCount();
        }
        return Promise.reject(error);
      },
    );
  }

  injectCallbacks(cb: HttpRequestCallback) {
    this._callbacks = cb;
  }

  setAuthorization(token: string, type: 'Token' | 'Bearer') {
    this._isAttachedAuthToken = true;
    this.instance.defaults.headers.common['Authorization'] = `${type} ${token}`;

    this._callbacks?.onSetAuthorization && this._callbacks.onSetAuthorization(token);
  }

  deleteAuthorization() {
    if (this._isAttachedAuthToken) {
      delete this.instance.defaults.headers.common['Authorization'];
      this._isAttachedAuthToken = false;
    }
  }

  get(path: string, config?: RequestConfig) {
    return this.instance
      .get(path, {
        // params: {
        //   language: DEFAULT_LANGUAGE,
        //   api_key: API_KEY,
        // },
        ...config,
      })
      .catch(this._handleError);
  }

  post(path: string, data?: any, config?: RequestConfig) {
    return this.instance
      .post(path, data, {
        params: {
          // language: DEFAULT_LANGUAGE,
          // api_key: API_KEY,
        },
        ...config,
      })
      .catch(this._handleError);
  }

  put(path: string, data?: any, config?: RequestConfig) {
    return this.instance
      .put(path, data, {
        params: {
          // language: DEFAULT_LANGUAGE,
          // api_key: API_KEY,
        },
        ...config,
      })
      .catch(this._handleError);
  }

  patch(path: string, data?: any, config?: RequestConfig) {
    return this.instance
      .patch(path, data, {
        params: {
          // language: DEFAULT_LANGUAGE,
          // api_key: API_KEY,
        },
        ...config,
      })
      .catch(this._handleError);
  }

  delete(path: string, config?: RequestConfig) {
    return this.instance
      .delete(path, {
        params: {
          // language: DEFAULT_LANGUAGE,
          // api_key: API_KEY,
        },
        ...config,
      })
      .catch(this._handleError);
  }
}

export const restClient = new RestClient(
  process.env.REACT_APP_API_ENDPOINT ?? 'https://api.themoviedb.org/3',
);
