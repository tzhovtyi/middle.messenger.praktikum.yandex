import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import inputField from '../../components/input_field';
import btn from "../../components/button/";

export default (props = {}) => {
    const fieldsRenderData = [
        {
        label: 'Почта',
        id: 'email',
        name: 'email'
        }, 
        {
        label: 'Логин',
        id: 'login',
        name: 'login'
        },
        {
        label: 'Имя',
        id: 'first_name',
        name: 'first_name'
        },
        {
        label: 'Фамилия',
        id: 'second_name',
        name: 'second_name'
        },
        {
        label: 'Телефон',
        id: 'phone',
        name: 'phone'
        },
        {
        label: 'Пароль',
        id: 'password',
        name: 'password',
        inputType: 'password'
        },
        {
        label: 'Пароль (еще раз)',
        id: 'password_repeated',
        name: 'password_repeated',
        inputType: 'password'
        }    
    ];

    const singUpBtn = btn('Зарегистрироваться', '');

	return Handlebars.compile(tpl)({fieldsRenderData: fieldsRenderData, singUpBtn: singUpBtn});
}
