import HTTPTransport from '../htttp-transport';
import { SignInData, SignUpData } from '../types';
import { BASE_URL } from '../consts';


class AuthAPI {
    private _signUpUrl: string;
    private _signInUrl: string;
    private _logOutUrl: string;
    private _userUrl: string;

    constructor() {
        this._userUrl = `${BASE_URL}/auth/user`;
        this._signUpUrl = `${BASE_URL}/auth/signup`;
        this._signInUrl = `${BASE_URL}/auth/signin`;
        this._logOutUrl = `${BASE_URL}/auth/logout`;
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
