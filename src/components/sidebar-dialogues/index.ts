import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { withChats } from '../../services/store/connect';

class SidebarDialogues extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'dialogues-container');
    }
    render() {
        return this.compile(tpl);
    }
}
export default withChats(SidebarDialogues);
