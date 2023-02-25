import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import SettingsField from '../settings_field';
import Button from '../button';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import { renderData } from './renderData';
import validator from '../../services/formvalidator';

const userInfoFields = renderData.map(data => {
    return new SettingsField('div',
        {...data,
            events: {
                focus: e=> {
                    validator.validateField(e.target as HTMLInputElement);
                },
                blur: e=> {
                    validator.validateField(e.target as HTMLInputElement);
                }
            }
        });
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
        userInfoFields:userInfoFields,
        sumbitBtn: sumbitBtn
    });
}
