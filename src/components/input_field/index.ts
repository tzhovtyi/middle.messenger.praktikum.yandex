import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class InputField extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'form-field');
        if (!this._props.inputType) {
            this._props.inputType = 'text';    
        }
    }
    render() {
        return this.compile(tpl);
    }
}
