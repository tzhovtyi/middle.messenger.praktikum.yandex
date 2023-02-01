/* eslint-disable @typescript-eslint/ban-types */
import {EventBusListeners} from './types';

export default class EventBus {
    listeners: EventBusListeners;
    constructor() {
        this.listeners = {};
    }
  
    on(event: string, callback: ()=> void): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
  
    off(event: string, callback: ()=> void): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }
  
    emit(event: string, ...args: (undefined | unknown)[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
      
        this.listeners[event].forEach(function(listener) {
            listener(...args);
        });
    }
}
