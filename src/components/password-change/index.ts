import tpl from 'bundle-text:./tpl.hbs';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import Button from '../button';
import validator from '../../services/formvalidator';
import { renderData } from './renderData';
import SettingsField from '../settings_field';

const sumbitBtn = new Button('div', {
    btnType: 'submit',
    label: 'Сохранить изменения'
});

const passwordChangeFields = renderData.map(data => {
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

class PasswordChangeForm extends Block {
    constructor(tag = 'form', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'user-info-container');
        this._element.setAttribute('id', 'passwordChangeForm');
    }
    render() {
        return this.compile(tpl);
    }
}

export const submitPasswordChangeBtn = sumbitBtn;
export function createPasswordChangeForm() {
    return new PasswordChangeForm('form', {
        passwordChangeFields: passwordChangeFields,
        submitBtn: sumbitBtn
    });
}
