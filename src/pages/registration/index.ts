import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import InputField from '../../components/input_field';
import Button from '../../components/button/';
import Block from '../../services/block';
import validator from '../../services/formvalidator';
import { BlockPropsAndChildren } from '../../services/types';
import { renderData } from './renderData';

const singUpBtn = new Button('div', {
    btnType: 'submit',
    label: 'Зарегистрироваться'
});

const inputFields = renderData.map(data => {
    return new InputField('div', data);
});

class RegistrationPage extends Block {
    render() {
        return this.compile(tpl);
    }
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
}

export default function createRegistrationPage() {
    return new RegistrationPage('div', {
        singUpBtn: singUpBtn,
        inputFields:inputFields,
        events: {
            submit: e => {
                return validator.validateSubmit(e);
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
