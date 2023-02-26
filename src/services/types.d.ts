/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from './block';
export interface EventBusListeners {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [key: string]: Array<Function>
}

export interface BlockEvents {
    [event: string]: (e: Event) => void;
}

export type BlockPropsAndChildren = {
    events?: BlockEvents
} & {
    [key: string]: unknown
};

export interface BlockMeta {
    tag: string,
    props: object
}

export interface BlockChildren {
    [key: string] : Block | Array<Block>
}

export interface ValidationRegex {
    [key: string]: RegExp
 }
export interface stringsObject {
     [key: string]: string
 }

export interface Options {
    data?: Record<string, any>,
    headers?: {[key: string]: string},
    timeout?: number,
    method?: string
}

export interface SignInData {
    login: string,
    password: string
}
export interface SignUpData extends SignInData{
    first_name: string,
    second_name: string,
    email: string,
    phone: string
}

export interface ProfileInfoData {
    first_name: string
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface ChangePasswordData {
    oldPassword: string,
    newPassword: string
}

export interface CreateChatData {
    title: string
}

export interface SearchUserData {
    login: string
}

export interface ChangeUsersInChatData {
    users: string[],
    chatId: string
}

export interface ChatIdData {
    chatId: string
}

export interface WebSocketProps {
    userId: string,
    chatId: string,
    token: string
}

export interface SocketSendData {
    content: string,
    type: string
}

export interface WebSocketEvents {
    onOpen: () => void
    onClose: (event: CloseEvent) => void
    onError: (event: ErrorEvent) => void
    onMessage: (event: MessageEvent) => void
}

export interface messageFromSocket {
    chat_id : number
    content : string
    file: unknown
    id: number
    is_read: boolean
    time: string
    type: string
    user_id: number
}

export type HTTPMethod = (url: string, options?: Options, timeout?: number) => Promise<XMLHttpRequest>

export type Indexed<T = any> = {
    [key in string]: T;
};
