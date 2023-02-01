import Block from '../../services/block';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';

export default class ErrorPage extends Block {
    render() {
        return this.compile(tpl);
    }
}
