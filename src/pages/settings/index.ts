import tpl from './tpl';
import './style.scss';
import {createSettingsUserInfo, submitUserInfoBtn} from '../../components/settings-user-info/';
import SettingsActions from '../../components/settings-actions/';
import { createPasswordChangeForm, submitPasswordChangeBtn } from '../../components/password-change/';
import Button from '../../components/button/';
import Block from '../../services/block';
import { BlockPropsAndChildren } from '../../services/types';
import validator from '../../services/formvalidator';
import authController from '../../services/controllers/auth-controller';
import userController from '../../services/controllers/user-controller';
import router from '../../services/routing/router';
import { IMG_URL } from '../../services/consts';
import { withAvatarAndName } from '../../services/store/connect';

const returnBtn = new Button('div', {
    label: '',
    btnType: 'button',
    btnClass: 'settings-sidebar__link',
    events: {
        click: ()=> {
            router.go('/messenger');
        }
    }
});

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
        authController.logOut();
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
const SettingsPageConnected = withAvatarAndName(SettingsPage);

const settings = new SettingsPageConnected('div', {
    userInfo: userInfo,
    settingsActions: settingsActions,
    returnBtn: returnBtn,
    IMG_URL: IMG_URL,
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
                    //don't get user info before the info is updated on server
                    (async function() {
                        await userController.updateProfile(e);
                        await authController.getUser();
                    })();
                    submitUserInfoBtn.hide();
                    settingsActions.show();
                    document.querySelectorAll('.settings__field__input').forEach(element => {
                        element.setAttribute('disabled', '');
                        element.classList.remove('settings__field__input_active');
                    });
                    break;
                case 'passwordChangeForm':
                    (async () => {
                        const errorDiv: HTMLElement = document.querySelector('#error-oldPassword')!;
                        const correctPassword = await userController.changePassword(e);
                        if (correctPassword) {
                            (document.getElementById('oldPassword') as HTMLInputElement)!.value = '';
                            (document.getElementById('newPassword') as HTMLInputElement)!.value = '';
                            submitPasswordChangeBtn.hide();
                            settingsActions.show();
                            settings.setProps({ userInfo: userInfo });
                        } else {
                            errorDiv.innerText = 'Неверный пароль';
                        }
                    })();
                    break;
                }
            }
        },
        change: e => {
            const files = (e.target as HTMLInputElement).files;
            if(!files) return;
            const img = files[0];
            const formData = new FormData();
            formData.append('avatar', img);
            const el = <HTMLElement>document.querySelector('.settings__change-avatar-menu-container');
            el.style.display = 'none';
            userController.changeAvatar(formData);
        }
    }
});

export default function createSettingsPage() {
    return settings;
}
