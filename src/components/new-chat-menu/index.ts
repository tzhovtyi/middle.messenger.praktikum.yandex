import tpl from './tpl';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class NewChatMenu extends Block {
    constructor(tag = 'button', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'new-chat-menu');
    }
    render() {
        return this.compile(tpl);
    }
}
