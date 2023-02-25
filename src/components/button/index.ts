import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import Block from '../../services/block';

export default class Button extends Block {
    render() {
        return this.compile(tpl);
    }
}
