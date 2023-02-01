import tpl from 'bundle-text:./tpl.hbs';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import Button from '../button';

const sumbitBtn = new Button('div', {
    btnType: 'submit',
    label: 'Сохранить изменения'
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
        submitBtn: sumbitBtn
    });
}
