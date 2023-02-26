import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { withMessages } from '../../services/store/connect';

class MessagesLent extends Block {
    constructor(tag = 'div', propsAndChildren:BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'chat-lent__messages-container');
    }
    render() {
        return this.compile(tpl);
    }
}

export default withMessages(MessagesLent);
