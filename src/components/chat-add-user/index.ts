import tpl from './tpl';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { withUserSearch } from '../../services/store/connect';

class ChatAddUser extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'add-user-menu');
    }
    render() {
        return this.compile(tpl);
    }
}

export default withUserSearch(ChatAddUser);
