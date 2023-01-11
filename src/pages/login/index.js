import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import inputField from '../../components/input_field';
import btn from "../../components/button/"

const logInBtn = btn('Войти', 'logIn()')
 window.logIn = function() {
    //temporal mock func for tests
    location.hash = "settings";
}
export default (props = {}) => {
	return Handlebars.compile(tpl)({logInBtn: logInBtn});
}
