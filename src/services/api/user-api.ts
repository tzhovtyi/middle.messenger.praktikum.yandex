import { ProfileInfoData, ChangePasswordData, SearchUserData } from './../types.d';
import HTTPTransport from '../htttp-transport';

class UserAPI {
    private _baseURL: string;
    private _passwordURL: string;
    private _profileURL: string;
    private _profileAvatarURL: string;
    private _searchURL: string;

    constructor() {
        this._baseURL = 'https://ya-praktikum.tech/api/v2/user';
        this._passwordURL = `${this._baseURL}/password`;
        this._profileURL = `${this._baseURL}/profile`;
        this._profileAvatarURL = `${this._baseURL}/profile/avatar`;
        this._searchURL = `${this._baseURL}/search`;
    }

    changeProfileInfo(data: ProfileInfoData) {
        return new HTTPTransport().put(this._profileURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    changePassword(data: ChangePasswordData) {
        return new HTTPTransport().put(this._passwordURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    changeProfileAvatar(data: FormData) {
        return new HTTPTransport().put(this._profileAvatarURL, {
            data
        });
    }

    searchUserByLogin(data: SearchUserData) {
        return new HTTPTransport().post(this._searchURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }
}

export default new UserAPI();
