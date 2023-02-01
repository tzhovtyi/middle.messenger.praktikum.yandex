import tpl from 'bundle-text:./tpl.hbs';
import InputField from '../../components/input_field';
import Button from '../../components/button/';
import Block from '../../services/block';
import validator from '../../services/formvalidator';
import './style.scss';
import { BlockPropsAndChildren } from '../../services/types';

const logInBtn = new Button('div', {
    btnType: 'submit',
    label: 'Войти'
});

const loginField = new InputField('div', {
    label: 'Логин',
    id: 'login'
});
const passwordField = new InputField('div', {
    label: 'Пароль',
    id: 'password',
    inputType: 'password'
});

class LogInPage extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'registration');
    }
    addEvents() {
        const {events = {}} = this._props;
        this._element.addEventListener('submit', events['submit']);
        this._element.querySelectorAll('input').forEach(item => {
            item.addEventListener('blur', events['blur']);
            item.addEventListener('focus', events['focus']);
        });
    }
    render() {
        return this.compile(tpl);
    }
}

export default function createLoginPage() {
    return new LogInPage('div', {
        logInBtn: logInBtn,
        loginField: loginField,
        passwordField: passwordField,
        events: {
            //validates by regex first, no need to send invalid fields to the server 
            submit: e => {
                validator.validateSubmit(e);
            },
            blur: e => {
                validator.validateField(e.target as HTMLInputElement);
            },
            focus: e => {
                validator.validateField(e.target as HTMLInputElement);
            }
        }
    });
}
