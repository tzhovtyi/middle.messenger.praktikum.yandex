import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import settingsField from '../../components/settings_field';
import createSettingsActions from "../../components/settings-actions/";
import createSettingsUserInfo from "../../components/settings-user-info/";
import createChangePasswordForm from "../../components/password-change/";
import btn from "../../components/button/";
import { user } from '../../mockData';

const renderData = [
    {
        id: 'first_name',
        name: 'first_name',
        label: 'Имя',
        value: user.first_name
    },
    {
        id: 'second_name',
        name: 'second_name',
        label: 'Фамилия',
        value: user.second_name
    },
    {
        id: 'display_name',
        name: 'display_name',
        label: 'Имя в чате',
        value: user.display_name
    },
    {
        id: 'login',
        name: 'login',
        label: 'Логин',
        value: user.login
    },
    {
        id: 'email',
        name: 'email',
        label: 'Почта',
        value: user.email
    },
    {
        id: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: user.phone
    }
]
const userInfo = createSettingsUserInfo({renderData});
const settingsActions = createSettingsActions({});
const changePasswordForm = createChangePasswordForm({});
const saveAvatarBtn = btn('Поменять', "saveAvatar()");

//temporal placeholder functions until the second sprint
//defined as window methods for easier temporal linking w/ handlebar tpls
window.changeUserInfo = function() {
    document.querySelector('.settings__actions-container').innerHTML = btn('Сохранить', "saveUserInfo()");
    document.querySelectorAll('.settings__field__input').forEach(element => {
        element.removeAttribute('disabled');
        element.classList.add('settings__field__input_active');
    })
}
window.saveUserInfo = function() {
    document.querySelector('.settings__actions-container').innerHTML = settingsActions;
    document.querySelectorAll('.settings__field__input').forEach(element => {
        element.setAttribute('disabled', '');
        element.classList.remove('settings__field__input_active');
    })
}
window.changePassword = function() {
    document.querySelector('.settings__user-info-container').innerHTML = changePasswordForm;
    document.querySelector('.settings__actions-container').innerHTML = btn('Сохранить', 'savePassword()');
}
window.savePassword = function() {
    document.querySelector('.settings__user-info-container').innerHTML = userInfo;
    document.querySelector('.settings__actions-container').innerHTML = settingsActions;
}
window.changeAvatar = function() { 
    document.querySelector('.settings__change-avatar-menu-container').style.display = 'grid';
}
window.saveAvatar = function() {
    document.querySelector('.settings__change-avatar-menu-container').style.display = 'none';
}

export default (props = {}) => {
	return Handlebars.compile(tpl)({userInfo: userInfo,
                                    settingsActions: settingsActions,
                                    saveAvatarBtn: saveAvatarBtn
                                    });
}
