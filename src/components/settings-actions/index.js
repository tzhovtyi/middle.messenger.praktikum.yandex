import Handlebars from 'handlebars';
import tpl from 'bundle-text:./tpl.hbs';
import './style.scss';
import btn from '/src/components/button/';

// changeUserInfo = function() {
//     document.querySelector('.settings__actions-container').innerHTML = btn('Сохранить', "saveUserInfo()");
//     document.querySelectorAll('.settings__field__input').forEach(element => {
//         element.removeAttribute('disabled');
//         element.classList.add('settings__field__input_active');
//     })
// }
// saveUserInfo = function() {
//     document.querySelector('.settings__actions-container').innerHTML = Handlebars.compile(tpl)({});
//     document.querySelectorAll('.settings__field__input').forEach(element => {
//         element.setAttribute('disabled', '')
//         element.classList.remove('settings__field__input_active');
//     })
// }
// changePassword = function() {
//     document.querySelector('.settings__user-info-container').innerHTML = ''
//     document.querySelector('.settings__actions-container').innerHTML = btn('Сохранить', "savePassword()");
// }
// savePassword = function() {
//     document.querySelector('.settings__user-info-container').innerHTML = ''
//     document.querySelector('.settings__actions-container').innerHTML = Handlebars.compile(tpl)({});
// }



export default ({}) => {
	return Handlebars.compile(tpl)({});
}
