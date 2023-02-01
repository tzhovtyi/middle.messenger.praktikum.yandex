import { RequestOptions, RequestOptionsMethodGet } from './types';

export default class HTTPTransport {
    private _METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    };
    public get = (url:string, options: RequestOptionsMethodGet = {}): Promise<XMLHttpRequest> => {		
        const queryString = options.data ? url + '?' + this._queryStringify(options.data) : url;
        return this._request(queryString, {method: this._METHODS.GET}, options.timeout);
    };
    public put = (url:string, options: RequestOptions = {}) => {				 
        return this._request(url, {...options, method: this._METHODS.PUT}, options.timeout);
    };
    public post = (url:string, options: RequestOptions = {}) => {				 
        return this._request(url, {...options, method: this._METHODS.POST}, options.timeout);
    };
    public delete = (url:string, options: RequestOptions = {}) => {				 
        return this._request(url, {...options, method: this._METHODS.DELETE}, options.timeout);
    };

    private _request = (url: string, options: RequestOptions = {method: this._METHODS.GET}, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers, method, data} = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject('No method');
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === this._METHODS.GET;
            xhr.open(method, url);

            if (headers && Object.keys(headers).length > 0) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = function() {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
  
            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };	
    private _queryStringify(obj: {[key: string]: string}) {
        const str = [];
        for (const p in obj)
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
                str.push(encodeURIComponent(p) + '=' + obj[p].toString());
            }
        return str.join('&');
    }	
}
