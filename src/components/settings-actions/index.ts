import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';

export default class SettingsActions extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'actions-container');
    }
    render() {
        return this.compile(tpl);
    }
}
