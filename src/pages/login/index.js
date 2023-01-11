import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import inputField from '../../components/input_field';
import btn from "../../components/button/"

const logInBtn = btn('Войти', 'logIn()')
const mockUsers = [
    {
        login: 'ivan',
        password: '1234'
    },
    {
        login: 'login',
        password: '123'
    }
]
 window.logIn = function() {
    document.getElementById('login-input-error').innerText = ''
    document.getElementById('password-input-error').innerText = ''

    const loginEntered = document.getElementById('login').value.trim();
    if (!loginEntered) {
        document.getElementById('login-input-error').innerText = 'Введите логин'
        return;
    }

    const user = mockUsers.find(user => user.login === loginEntered);
    if (!user) {
        document.getElementById('login-input-error').
        innerText = `Не существует пользователя с логином ${loginEntered}`
        return;
    }

    const passwordEntered = document.getElementById('password').value;
    if (!passwordEntered) {
        document.getElementById('password-input-error').innerText = 'Введите пароль'
        return;
    }
    if (user.password === passwordEntered) {
        location.hash = "settings";
        console.log('welcome')
    } else {
        document.getElementById('password-input-error').innerText = 'Неверный пароль'
    }
}
export default (props = {}) => {
	return Handlebars.compile(tpl)({logInBtn: logInBtn});
}
