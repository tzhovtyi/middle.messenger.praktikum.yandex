import HTTPTransport from '../htttp-transport';
import { SignInData, SignUpData } from '../types';


class AuthAPI {
    private _baseUrl: string;
    private _signUpUrl: string;
    private _signInUrl: string;
    private _logOutUrl: string;
    private _userUrl: string;

    constructor() {
        this._baseUrl = 'https://ya-praktikum.tech/api/v2';
        this._userUrl = `${this._baseUrl}/auth/user`;
        this._signUpUrl = `${this._baseUrl}/auth/signup`;
        this._signInUrl = `${this._baseUrl}/auth/signin`;
        this._logOutUrl = `${this._baseUrl}/auth/logout`;
    }

    signUp(data: SignUpData) {
        return new HTTPTransport().post(this._signUpUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    signIn(data: SignInData) {
        return new HTTPTransport().post(this._signInUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    getUser() {
        return new HTTPTransport().get(this._userUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    logOut() {
        return new HTTPTransport().post(this._logOutUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }
}

export default new AuthAPI();
