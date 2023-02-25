import HTTPTransport from '../htttp-transport';
import { ChangeUsersInChatData, ChatIdData } from '../types';

class ChatsAPI {
    private _baseURL: string;
    private _chatsUsersURL: string;
    private _tokenURL: string;
    private _avatarURL: string;

    constructor() {
        this._baseURL = 'https://ya-praktikum.tech/api/v2/chats';
        this._chatsUsersURL = `${this._baseURL}/users`;
        this._tokenURL = `${this._baseURL}/token`;
        this._avatarURL = `${this._baseURL}/avatar`;
    }

    createChat(data: {title: string}) {
        return new HTTPTransport().post(this._baseURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    getChats() {
        return new HTTPTransport().get(this._baseURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    addUsersToChat(data: ChangeUsersInChatData) {
        return new HTTPTransport().put(this._chatsUsersURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    removeUsersFromChat(data: ChangeUsersInChatData) {
        return new HTTPTransport().delete(this._chatsUsersURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }

    deleteChat(data: ChatIdData) {
        return new HTTPTransport().delete(this._baseURL, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data
        });
    }



    getChatUsers(chatId: string) {
        return new HTTPTransport().get(`${this._baseURL}/${chatId}/users`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }

    getChatToken(chatId: string) {
        return new HTTPTransport().post(`${this._tokenURL}/${chatId}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
    }

    changeAvatar(data: FormData) {
        return new HTTPTransport().put(this._avatarURL, {
            data
        });
    }
}

export default new ChatsAPI();
