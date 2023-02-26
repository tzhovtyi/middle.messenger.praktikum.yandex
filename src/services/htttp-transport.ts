import queryStringify from '../utils/query-string';
import { HTTPMethod } from './types';

const enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export default class HTTPTransport {

    public get:HTTPMethod = (url, options = {}) => {
        const { data } = options;
        const query = data ? url + queryStringify(data) : url;
        return this._request(
            query,
            {...options, method: METHODS.GET},
            options.timeout
        );
    };

    public put:HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.PUT},
            options.timeout
        );
    };

    public post:HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.POST},
            options.timeout
        );
    };

    public delete:HTTPMethod = (url, options = {}) => {
        return this._request(
            url,
            {...options, method: METHODS.DELETE},
            options.timeout
        );
    };

    private _request:HTTPMethod = (
        url,
        options = {method: METHODS.GET},
        timeout = 5000
    ) => {

        const {headers, method, data} = options;
        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, url);

            for (const headerName in headers) {
                xhr.setRequestHeader(headerName, headers[headerName]);
            }
            xhr.withCredentials = true;

            xhr.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
