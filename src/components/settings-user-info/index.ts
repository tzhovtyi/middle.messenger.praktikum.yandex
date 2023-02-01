import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import SettingsField from '../settings_field';
import Button from '../button';
import Block from '../../services/block';
import { user } from '../../mockData';
import { BlockPropsAndChildren } from '../../services/types';

const firstNameField = new SettingsField('div', {
    id: 'first_name',
    label: 'Имя',
    value: user.first_name
});
const secondNameField = new SettingsField('div', {
    id: 'second_name',
    label: 'Фамилия',
    value: user.second_name
});
const displayNameField = new SettingsField('div', {
    id: 'display_name',
    label: 'Имя в чате',
    value: user.display_name
});
const loginField = new SettingsField('div', {
    id: 'login',
    label: 'Логин',
    value: user.login
});
const emailField = new SettingsField('div', {
    id: 'email',
    label: 'Почта',
    value: user.email
});
const phoneField = new SettingsField('div', {
    id: 'phone',
    label: 'Телефон',
    value: user.phone
});
const sumbitBtn = new Button('div', {
    btnType: 'submit',
    label: 'Сохранить изменения'
});
sumbitBtn.hide();

class SettingsUserInfo extends Block {
    constructor(tag = 'form', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'user-info-container');
        this._element.setAttribute('id', 'userInfoForm');
    }
    render() {
        return this.compile(tpl);
    }
}
//button methods are used in the settings
export const submitUserInfoBtn = sumbitBtn;
export function createSettingsUserInfo() {
    return new SettingsUserInfo('form', {
        firstNameField: firstNameField,
        secondNameField: secondNameField,
        displayNameField: displayNameField,
        loginField: loginField,
        emailField: emailField,
        phoneField: phoneField,
        sumbitBtn: sumbitBtn
    });
}
