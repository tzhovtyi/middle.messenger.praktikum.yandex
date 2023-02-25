import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class Button extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}, className = '') {
        super(tag, propsAndChildren, className);
        if (!this._props.btnClass) {
            this._props.btnClass = 'btn-div';
        }
    }
    render() {
        return this.compile(tpl);
    }
}
