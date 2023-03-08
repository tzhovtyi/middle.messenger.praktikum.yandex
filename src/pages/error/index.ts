import Block from '../../services/block';
import tpl from './tpl';
import './style.scss';
import router from '../../services/routing/router';
import Button from '../../components/button';

class ErrorPage extends Block {
    render() {
        return this.compile(tpl);
    }
}

const returnBtn = new Button('div', {
    label: 'Назад к чатам',
    btnType: 'button',
    btnClass: 'error__return-link',
    events: {
        click: ()=> {
            router.go('/messenger');
        }
    }
});

export function createError404() {
    return new ErrorPage('div', {
        errorNumber: '404',
        errorText: 'Не туда попали',
        returnBtn:returnBtn
    });
}

export function createError500() {
    return new ErrorPage('div', {
        errorNumber: '500',
        errorText: 'Уже фиксим',
        returnBtn:returnBtn
    });
}
