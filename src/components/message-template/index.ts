import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class MessageTemplate extends Block {
    constructor(tag = 'div', propsAndChildren:BlockPropsAndChildren = {}) {
        const align = propsAndChildren.fromViewer? 'message message_right' : 'message';
        super(tag, propsAndChildren, align);
    }
    render() {
        return this.compile(tpl);
    }
}
