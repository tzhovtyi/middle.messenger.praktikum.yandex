import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import {createSettingsUserInfo, submitUserInfoBtn} from '../../components/settings-user-info/';
import SettingsActions from '../../components/settings-actions/';
import { createPasswordChangeForm, submitPasswordChangeBtn } from '../../components/password-change/';
import Button from '../../components/button/';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import validator from '../../services/formvalidator';

const saveAvatarBtn = new Button('div', {
    btnType: 'button',
    label: 'Поменять',
    events: {
        click: () => {
            const el = <HTMLElement>document.querySelector('.settings__change-avatar-menu-container');
            el.style.display = 'none';
        }
    }
});

//imported as class instances
const userInfo = createSettingsUserInfo();
const changePasswordForm = createPasswordChangeForm();

const settingsActions =  new SettingsActions('div', {
    events: {
        click: e => {
            return fireUserAction(e);
        }
    }
});

function fireUserAction(e: Event) {
    const action = (e.target as HTMLButtonElement).name;
    switch(action) {
    case 'infoChange':
        submitUserInfoBtn.show();
        document.querySelectorAll('.settings__field__input').forEach(element => {
            element.removeAttribute('disabled');
            element.classList.add('settings__field__input_active');
        });
        settingsActions.hide();
        break;
    case 'passwordChange':
        submitPasswordChangeBtn.show();
        settings.setProps({ userInfo: changePasswordForm });
        document.querySelectorAll('.settings__field__input').forEach(element => {
            element.removeAttribute('disabled');
            element.classList.add('settings__field__input_active');
        });
        settingsActions.hide();
        break;
    case 'logOut':
        console.log('Log Out!');
        break;
    }
}

class SettingsPage extends Block {
    constructor(tag = 'div', propsAndChildren: BlockPropsAndChildren = {}) {
        super(tag, propsAndChildren, 'settings');
    }
    render() {
        return this.compile(tpl);
    }
}

const settings = new SettingsPage('div', {
    userInfo: userInfo,
    settingsActions: settingsActions,
    saveAvatarBtn: saveAvatarBtn,
    events: {
        click: e => {
            if(e.target instanceof Element && e.target.id === 'avatar') {
                const el = <HTMLElement>document.querySelector('.settings__change-avatar-menu-container');
                el.style.display = 'grid';
            }
        },
        submit: e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const valid = validator.validateSubmit(e);
            if(valid) {
                switch (form.id) {
                case 'userInfoForm':
                    submitUserInfoBtn.hide();
                    settingsActions.show();
                    document.querySelectorAll('.settings__field__input').forEach(element => {
                        element.setAttribute('disabled', '');
                        element.classList.remove('settings__field__input_active');
                    });
                    break;
                case 'passwordChangeForm':
                    submitPasswordChangeBtn.hide();
                    settingsActions.show();
                    settings.setProps({ userInfo: userInfo });
                    break;
                }
            }
        }
    }
});

export default function createSettingsPage() {
    return settings;
}
