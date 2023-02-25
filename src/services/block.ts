import EventBus from './eventbus';
import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid';
import {BlockPropsAndChildren, BlockMeta, BlockChildren} from './types';
import isEqual from '../utils/is-equal';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    };

    _props: BlockPropsAndChildren;
    _children: BlockChildren;
    _id: string;
    _element: HTMLElement;
    _meta: BlockMeta;
    _eventBus: EventBus;
    _class: string;

    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}, className = '') {

        const {children, props } = this.separateChildComponents(propsAndChildren);
        this._eventBus = new EventBus();

        this._id = makeUUID();
        this._children = this._makePropsProxy(children) as BlockChildren;
        this._class = className;
        this._props = this._makePropsProxy(props);
        this._meta = { tag, props};

        this._registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(): void {
        this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }


    init(): void {
        this._element = this.createDocumentElement(this._meta?.tag);
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    createDocumentElement(tag: string): HTMLElement | HTMLTemplateElement {
        const element = document.createElement(tag);
        return element;
    }

    _render(): void {
        const block:Node = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addEvents();
        this._element.setAttribute('class', this._class);
    }

    render(): Node {
        return document.createElement('div');
    }

    addEvents() {
        const {events = {}} = this._props;
        Object.keys(events).forEach((item) => {
            //all components main wrappers are divs or forms
            //blur and focus should be applied to input elements directly
            if(item === 'blur' || item === 'focus') {
                const input = this._element.querySelector('input');
                input!.addEventListener(item, events[item]);
            } else {
                this._element.addEventListener(item, events[item]);
            }
        });
    }
    removeEvents() {
        const {events = {}} = this._props;
        Object.keys(events).forEach((item) => {
            if(item === 'blur' || item === 'focus') {
                const input = this._element.querySelector('input');
                if (input) {
                    input.removeEventListener(item, events[item]);
                }
            } else {
                this._element.removeEventListener(item, events[item]);
            }
        });
    }

    separateChildComponents(propsAndChildren:BlockPropsAndChildren ) : {children: BlockChildren, props: BlockPropsAndChildren} {
        const props: BlockPropsAndChildren = {};

        const children: BlockChildren = {};
        Object.keys(propsAndChildren).forEach(key => {
            //checks for arrays of children too
            if(propsAndChildren[key] instanceof Block || (Array.isArray(propsAndChildren[key]) && (propsAndChildren[key] as Array<unknown>)[0] instanceof Block)) {
                children[key] = propsAndChildren[key] as Block | Block[];

            } else {
                props[key] = propsAndChildren[key];
            }
        });
        return {children, props};
    }

    compile(template: string, props?: BlockPropsAndChildren) {
        if(typeof(props) === 'undefined') {
            props = this._props;
        }

        Object.entries(this._children).forEach(([key, child]) => {
            if(Array.isArray(child)) {
                props![key] = `<div data-id="${child[0]._id}"></div>`;
            } else {
                props![key] = `<div data-id="${child._id}"></div>`;
            }
        });

        const fragment = <HTMLTemplateElement>this.createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(template)(props);

        Object.values(this._children).forEach(child => {
            if(Array.isArray(child)) {
                const fr = <HTMLTemplateElement>this.createDocumentElement('template');
                try {
                    child.forEach(cmp => {
                        fr.content.appendChild(cmp.getContent());
                    });
                } catch(e) {
                    console.log(e);
                }

                const stub = fragment.content.querySelector(`[data-id="${child[0]._id}"]`);
                if (stub) {
                    stub.replaceWith(fr.content);
                }
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
                if (stub) {
                    stub.replaceWith(child.getContent());
                }
            }
        });
        return fragment.content;
    }

    _componentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        this.componentDidMount();
        Object.values(this._children).forEach(child => {
            if (child instanceof Block) {
                child.dispatchComponentDidMount();
            }
        });
    }
    componentDidMount() {
        return true;
    }

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _componentDidUpdate(oldProps: BlockPropsAndChildren, newProps: BlockPropsAndChildren): void {
        const response = this.checkPropsChange(oldProps, newProps);
        if (response) {
            this.componentDidUpdate();
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }
    componentDidUpdate(): void {
        return;
    }

    checkPropsChange(oldProps: BlockPropsAndChildren, newProps: BlockPropsAndChildren): boolean {
        if (isEqual(oldProps, newProps)) {
            return false;
        }
        return true;

    }

    setProps(newProps: BlockPropsAndChildren): void {
        const {children, props} = this.separateChildComponents(newProps);
        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }
        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }
    }

    _makePropsProxy(props: BlockPropsAndChildren ): BlockChildren | BlockPropsAndChildren{
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        props = new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value: string | number | number[] | string[] | Block | Block[]) {
                const old = target[prop];
                target[prop] = value;
                self._eventBus.emit(Block.EVENTS.FLOW_CDU, old, value);
                return true;
            }
        });
        return props;
    }

    getContent(): HTMLElement {
        return this._element;
    }

    show(): void {
        this._element.style.display = 'flex';
    }

    hide(): void {
        this._element.style.display = 'none';
    }
}
