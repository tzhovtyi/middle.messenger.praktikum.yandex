import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class NewChatBtn extends Block {
    constructor(tag = 'button', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'chat-sidebar__new-chat');
    }
    render() {
        return this.compile(tpl);
    }
}
