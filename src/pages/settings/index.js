import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import settingsField from '../../components/settings_field';
import createSettingsActions from "../../components/settings-actions/"
import createSettingsUserInfo from "../../components/settings-user-info/"
import createChangePasswordForm from "../../components/password-change/"
import btn from "../../components/button/"

const renderData = [
    {
        id: 'first_name',
        label: 'Имя',
        value: 'Иваныч'
    },
    {
        id: 'second_name',
        label: 'Фамилия',
        value: 'Иваныч'
    },
    {
        id: 'display_name',
        label: 'Имя в чате',
        value: 'Иваныч'
    },
    {
        id: 'login',
        label: 'Логин',
        value: 'Иваныч'
    },
    {
        id: 'email',
        label: 'Почта',
        value: 'Иваныч'
    },
    {
        id: 'phone',
        label: 'Телефон',
        value: 'Иваныч'
    }
]
const userInfo = createSettingsUserInfo({renderData})
const settingsActions = createSettingsActions({});
const changePasswordForm = createChangePasswordForm({})
const saveAvatarBtn = btn('Поменять', "saveAvatar()")

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
        element.setAttribute('disabled', '')
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
window.logOut = function() {
    alert('вы вышли из аккаунта');
}


export default (props = {}) => {
	return Handlebars.compile(tpl)({userInfo: userInfo,
                                    settingsActions: settingsActions,
                                    saveAvatarBtn: saveAvatarBtn
                                    });
}
