import { WebSocketProps, SocketSendData, WebSocketEvents} from '../types';

export default class WebSocketFactory {
    socket: WebSocket;
    // props: WebSocketProps;
    events: WebSocketEvents;
    private _baseURL: string;

    constructor(data : WebSocketProps, events: WebSocketEvents) {
        // this.props = data;
        this.events = events;
        const {userId, chatId, token} = data;
        this._baseURL = 'wss://ya-praktikum.tech/ws/chats';
        this.socket = new WebSocket(
            `${this._baseURL}/${userId}/${chatId}/${token}`
        );

        this.socket.addEventListener('open', this.events.onOpen);
        this.socket.addEventListener('message', this.events.onMessage);
        this.socket.addEventListener('error', this.events.onError);
        this.socket.addEventListener('close', this.events.onClose);
    }

    send(data: SocketSendData) {
        return this.socket.send(JSON.stringify(data));
    }

    close() {
        return this.socket.close();
    }
}
