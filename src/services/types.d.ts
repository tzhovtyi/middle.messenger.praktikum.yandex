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

type RequestData = Document | XMLHttpRequestBodyInit | null | undefined


export interface RequestOptions {
    data?: RequestData,
    headers?: {[key: string]: string},
    timeout?: number,
    method?: string
}

export interface RequestOptionsMethodGet {
    data?: { [key: string]: string },
    timeout?: number,
    headers?: {[key: string]: string}
}
