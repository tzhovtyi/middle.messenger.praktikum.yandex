import EventBus from '../eventbus';
import { Indexed } from '../types';
import set from '../../utils/set';

export enum StoreEvents {
    EVENT_UPDATE = 'Update',
  }

class Store extends EventBus {
    private _state: Indexed;
    static EVENT_UPDATE = 'Update';
    static STORE_NAME = 'appStore';

    constructor() {
        super();
        const savedState = localStorage.getItem(Store.STORE_NAME);
        this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};
        this.on(
            Store.EVENT_UPDATE,
            () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));}
        );
    }

    public getState() {
        return this._state;
    }
    public setState(path: string, value: unknown) {
        if(path === 'currentChat') {
            // console.log(isEqual(this.getState().currentChat, value));
        }
        set(this._state, path, value);
        this.emit(Store.EVENT_UPDATE);
    }
    public clearState() {
        this._state = {};
        this.emit(Store.EVENT_UPDATE);
    }

}

export default new Store();
