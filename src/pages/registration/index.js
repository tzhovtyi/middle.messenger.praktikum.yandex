import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import inputField from '../../components/input_field';
import btn from "../../components/button/";

export default (props = {}) => {
    const fieldsRenderData = [
        {
        label: 'Почта',
        id: 'email'
        }, 
        {
        label: 'Логин',
        id: 'login'
        },
        {
        label: 'Имя',
        id: 'first_name'
        },
        {
        label: 'Фамилия',
        id: 'second_name'
        },
        {
        label: 'Телефон',
        id: 'phone'
        },
        {
        label: 'Пароль',
        id: 'password',
        inputType: 'password'
        },
        {
        label: 'Пароль (еще раз)',
        id: 'password_repeated',
        inputType: 'password'
        }    
    ];

    const singUpBtn = btn('Зарегистрироваться', '');

	return Handlebars.compile(tpl)({fieldsRenderData: fieldsRenderData, singUpBtn: singUpBtn});
}
